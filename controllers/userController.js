import User from "../models/userModels.js";


export const userRegistration = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(400).json({ message: "User already exist" });
        }

        const user = await User.create({
            name,
            email,
            password,
        });
        await user.save();

        res.status(201).json({ message: "User registered successfully", user });

    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).json({ message: "Server error" });

    }
}


export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        res.status(200).json({
            message: "User logged in successfully",
            userData: {
                id: user._id,
                name: user.name,
                email: user.email,
            }
        });

    } catch (error) {
        log(`Error: ${error.message}`);
        res.status(500).json({ message: "Server error" });
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(
            {
                message: "Users fetched successfully",
                userData: users
            }
        )
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).json({ message: "Server error Found" });

    }
}