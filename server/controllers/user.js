import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import base64url from 'b64url';
import User from "../models/user.js";
import { sendMail } from '../lib/mail.js';
import { createCart } from "./shoppingCart.js";

const secret = 'test';

export const signinByToken = async (req, res) => {
    let email = null;
    if (req.body.myAuth == 'facebook') {
        let decodeData = req.body.response.signedRequest.split('.', 2);
        decodeData = base64url.decode(decodeData[1]);
        decodeData = JSON.parse(decodeData);
        if (decodeData.user_id == req.body.response.userID) email = req.body.response.email;
    }
    else {
        let decodeData = jwt.decode(req.body.token);
        if (decodeData.email_verified) email = decodeData.email;
    }

    if (email) {
        try {
            const existingUser = await User.findOne({ email: email });
            if (!existingUser) return res.status(404).json({ message: "User doesn't exist." });
            const token = await jwt.sign({ email: existingUser.email, id: existingUser._id }, secret, { expiresIn: "1h" });
            res.status(200).json({ result: existingUser, token })
        } catch (err) { res.status(500).json({ message: 'Something went wrong.' }); }
    }
}

export const signin = async (req, res) => {
    const { email, password } = req.body;
    console.log("---------------");
    console.log(email + " try to log in pass: " + password);
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) return res.status(404).json({ message: "User doesn't exist." });
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(403).json({ message: "Invalid credentials." });
        const token = await jwt.sign({ email: existingUser.email, id: existingUser._id, type:existingUser.type }, secret, { expiresIn: "1h" });
        res.status(200).json({ result: existingUser, token })
        // res.status(200).json({ result: existingUser })
    } catch (err) { res.status(500).json({ message: 'Something went wrong.' }); }
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
        const newUser = await User.create({ email, password: hashedPassword, name: `${firstName}${lastName}` ,type:'client'});
        const token = jwt.sign({ email: newUser.email, id: newUser._id ,type:newUser.type}, secret, { expiresIn: "1h" });
        createCart(newUser._id);
        res.status(200).json({ newUser, token });
    } catch (err) { res.status(500).json({ message: 'Something went wrong.' }); }
}

export const resetPassword = async (req, res, next) => {
    const { resetToken, password, confirmPassword } = req.body;
    if (password != confirmPassword) return res.status(403).json({ message: "Passwords don't match." });
    const hashedPassword = await bcrypt.hash(password, 12);

    User.updateOne({ resetToken: resetToken }, { $set: { password: hashedPassword } }, async (err, success) => {
        err ? res.status(400).json({ error: "reset link error" }) : res.status(200);
    })
}

export const forgetPassword = async (req, res, next) => {
    const { email } = req.body;

    console.log(email + " forget is Password - request new one.");

    User.findOne({ email })
        .then(async (user) => {
            if (user) {
                console.log("email: " + user.email);
                // user.save().then(async () => {
                var resetToken = (Math.floor(Math.random() * 1000000)).toString();

                var html = `<h1>reset password</h1><h5>click in this `
                    + `<a href="http://localhost:4000/auth?resetToken=${resetToken}">link</a>`
                    + ` to reset the password.</h5><h6>if you don\'t reqwest password reset plase lat as know!</h6>`;

                User.updateOne({ email }, { $set: { resetToken: resetToken, expireToken: Date.now() + 3600000 } }, async function (err, success) {
                    if (err) res.status(400).json({ error: "reset link error" });
                    else {
                        await sendMail(user.email, html);
                        console.log("email send to " + user.email);
                        res.json({ message: "email send." });
                    }
                })
                //  })
            }
            else res.send('<h1>user not found!</h1>');
        })
        .catch((err) => { next(err); console.log("err: " + err); });
}

//------------------------------------------
export const getUsers = async (req, res) => {
    console.log("getUsers1");
    try {
        const users = await User.find();
        console.log("getUsers "+JSON.stringify(users));

        res.status(200).json(users);
    } catch (err) {res.status(404).json({ message: err.message });}
}

export const createUser = async (req, res) => {
    const user = req.body;
    const newUser = new User(user);
    try {
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {res.status(409).json({ message: err.message });}
}

export const updateUser = async (req, res) => {
    const { id: _id } = req.params;
    const user = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No user with that id');
    const updateUser = await User.findByIdAndUpdate(_id, { ...user, _id }, { new: true });

    res.json(updateUser);
}

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No user with that id');

    await User.findByIdAndRemove(id);

    res.json({ message: 'User deleted sucssfuly' })
}
