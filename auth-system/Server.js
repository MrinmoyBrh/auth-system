require('dotenv').config();  //Load variables from .env
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const User = require('./User');

const jwt = require('jsonwebtoken');
const connectDB = require('./db');
const JWT_SECRET = "supersecretkey123";

const app = express();
app.use(express.json());

//Connect to MonboDB
connectDB();

//Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

//1 :Signup Router

app.post('/api/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        //Check if user already exists
        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(400).json({message: "Email already registered"});

        //Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        //Generate a 6-digit random OTP
        const generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); //5 minute validity
        
        const newUser = new User({
            name,
            email,
            password:hashedPassword,
            otp: generatedOTP,
            otpExpiresAt: otpExpiry
        });

        await newUser.save();

        //(Optional: In production, send generatedOTP via nodemailer )
        console.log(`OTP for ${email}: ${generatedOTP}`);

        res.status(201).json({ message: "User registered! Please verify OTP.", email});
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
});

//2: verify otp route

app.post('/api/verify-otp', async (req, res) => {
    try {
        const {email, otp}=req.body;
        const user = await User.findOne({email});

        if (!user) return res.status(404).json({message: "Oops! user not found."});

        //Check if OTP matches and hasn't expired
        if (user.otp !== otp || user.otpExpiresAt < new Date()) {
            return res.status(400).json({message: "Invalid or expired OTP."});
        }

        user.isVerified = true;
        user.otp = undefined;
        user.otpExpiresAt = undefined;
        await user.save();

        res.json({message: "Account verified Successfully! You can now log in"});

    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

//3: Login Route

app.post('/api/login', async (req, res) => {
    try {
        const { email, password} = req.body;
        const user = await User.findOne({ email});

        if(!user) return res.status(404).json({message : "User not found!"});
        if(!user.isVerified) return res.status(403).json({message: "Please verify youremail first."});

        //Compare enetred plain password with stored hash
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400),json({message: "Incorrect password!"});

        //Issue token
        const token = jwt.sign({ userId: user._id}, JWT_SECRET, {expiresIn: '1h'});
        
        res.json({message: "Login successful!", token });

    } catch (error) {
        res.status(500).json({ error: error.message});
    }
});

//4: Logout route
app.post('/api/logout', (req, res) => {
    //In JWT authentication, logging out on the client side means deleating the stored token
    res.json({message: "Logged out successfully. Celar your token on client side." });

});

app.listen(5000, () => console.log("Server running on port 5000"));