import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


const generateToken = user => {
    return jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET_KEY, {
        expiresIn: '15d',
    });
}


export const register = async (req, res) => {

    const {email, password, name, role, photo, gender } = req.body;

    try {
        let user = null;

        if(role === 'patient' || role === 'admin'){
            user = await User.findOne({email})
        }
        else if(role == 'doctor'){
            user = await Doctor.findOne({email})
        }

        // check if the user already exists
        if(user){
            return res.status(400).json({message: "User already exists."});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        if(role === 'patient' || role === 'admin'){
            user = new User({
                name,
                email,
                password: hashedPassword,
                photo,
                gender,
                role
            });
        }

        if(role === 'doctor'){
            user = new Doctor({
                name,
                email,
                password: hashedPassword,
                photo,
                gender,
                role
            });
        }

        await user.save();

        res.status(200).json({
            success: true,
            message: "User registered successfully"
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error, Try again!"
        });
    }
};


export const login = async (req, res) => {

    const { email } = req.body;

    try {
        let user = null;

        const patient = await User.findOne({email});
        const doctor = await Doctor.findOne({email});

        if(patient){
            user = patient;
        }
        if(doctor){
            user = doctor;
        }
        
        // check if the user exists
        if(!user){
            return res.status(404).json({message: "User don't exist."});
        }

        // compare password
        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);

        if(!isPasswordMatch){
            return res.status(400).json({
                success: false,
                message: "Invalid login credentials",
            });
        }

        // get token
        const token = generateToken(user);

        const { password, role, appointments, ... rest } = user._doc;

        res.status(200).json({
            success: true,
            message: "Successfully logged in",
            token,
            data: {...rest, photo: user.photo},
            role
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Login failed, Please try again"
        });
    }
};