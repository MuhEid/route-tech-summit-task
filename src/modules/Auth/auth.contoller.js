import User from "../../../DB/models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
    const { name, email, password } = req.body;

    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
        return res.status(400).json({ message: "Email already exists", status: 400 });
    }

    const saltRounds = parseInt(process.env.SALT_ROUNDS || "12", 10);
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await User.create({ name, email, password: hashedPassword });
    res.status(200).json({ message: " User Created", user });
};

export const signIn = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: "Invalid login credentials" });
    }
    const isPasswordMatch = bcrypt.compareSync(password, user.password);
    if (!isPasswordMatch) {
        return res.status(401).json({ message: "Invalid login credentials" });
    }

    const token = jwt.sign(
        { id: user._id, email: user.email, name: user.name },
        process.env.TOKEN_SIGNATURE,
        {
            expiresIn: "2h",
        }
    );
    return res.status(200).json({ message: "Login success", token });
};
