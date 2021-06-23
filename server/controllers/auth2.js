import User from "../models/user.js";
import { sendMail } from '../lib/mail.js';


export const resetPassword = async (req, res, next) => {
    const { resetToken, password } = req.body;

    User.updateOne({ resetToken }, { $set: { password: password } }, async (err, success) => {
        if (err) res.status(400).json({ error: "reset link error" });
        else {
            await sendMail(user.email, html);
            res.json({ message: "email send." });
        }
    })
}

export const forgetPassword = async (req, res, next) => {
    const { email } = req.body;

    console.log(email + " forget is Password - request new one.");

    User.findOne({ email })
        .then(async (user) => {
            if (user) {
                console.log("email: " + user.email + " username: " + user.username);
                // user.save().then(async () => {
                var resetToken = (Math.floor(Math.random() * 1000000)).toString();

                var html = `<h1>reset password</h1><h5>click in this `
                    + `<a href="http://localhost:4000/auth?resetToken=${resetToken}">link</a>`
                    + ` to reset the password.</h5><h6>if you don\'t reqwest password reset plase lat as know!</h6>`;

                User.updateOne({ email }, { $set: { resetToken: resetToken, expireToken: Date.now() + 3600000 } }, async function (err, success) {
                    if (err) res.status(400).json({ error: "reset link error" });
                    else {
                        await sendMail(user.email, html);
                        res.json({ message: "email send." });
                    }
                })
                //  })
            }
            else res.send('<h1>user not found!</h1>');
        })
        .catch((err) => { next(err); console.log("err: " + err); });
}

//----------------------------------------------------------------

export const signin = (req, res, next) => {
    console.log("i am in signin")
    
   
    console.log("2");
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
        res.status(200).json({ newUser, token });
        //  res.status(200).json({ newUser });
    } catch (err) { res.status(500).json({ message: 'Something went wrong.' }); }
}
