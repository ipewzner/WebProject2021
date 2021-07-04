import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import User from "../models/user.js";
import { createCart } from "./shoppingCart.js";
const secret = 'test';

export const signin = async (req, res) => {
    const { email, password } = req.body;
    console.log("---------------");
    console.log(email + " try to log in pass: " + password);
    try {
        const existingUser = await User.findOne({ email });       
        if (!existingUser) return res.status(404).json({ message: "User doesn't exist." });
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(403).json({ message: "Invalid credentials." });
        const token = await jwt.sign({ email: existingUser.email, id: existingUser._id }, secret, { expiresIn: "1h" });
        res.status(200).json({ result: existingUser, token })
       // res.status(200).json({ result: existingUser })
    } catch (err) {res.status(500).json({ message: 'Something went wrong.' });}
}

export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;
    console.log("---------------");
    console.log(email + " try to signup pass: " + password);
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(405).json({ message: "User already exist." });
        if (password != confirmPassword) return res.status(403).json({ message: "Passwords don't match." });

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await User.create({ email, password: hashedPassword, name: `${firstName}${lastName}` });
        const token = jwt.sign({ email: newUser.email, id: newUser._id }, secret, { expiresIn: "1h" });
        createCart(newUser._id);
        res.status(200).json({ newUser, token });
      //  res.status(200).json({ newUser });
    } catch (err) {res.status(500).json({ message: 'Something went wrong.' });}
}

export const forgetPassword = async (req, res) => {res.status(200).json({ message: 'working?' });}
