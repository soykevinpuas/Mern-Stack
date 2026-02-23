import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// funcion que maneja POST / register
export const register = async ( req, res ) => {
    try {
        const { email, password } = req.body;
            // validar datos 
        if (!email || !password) {
            return res.status(400).json({message: "Email y contraseña requeridos "});
        }
            //verificar si el usuario existe 
        const existingUser = await User.findOne({email});
        if (existingUser){
            return res.status(400).json({message:"Este usuario ya existe"})
        }

        // Hash de contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear usuario 
        const user = await User.create({
            email,
            password: hashedPassword,
        });


        // Generar token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );



        // Respuesta
        return res.status(201).json({
            token,
            user: {
                id: user._id,
                email: user.email,
            },
        });
        // Cualquier error (avisar)
    } catch (error) {
        res.status(500).json({ message:  "Error en el registro" });
    }
};


// POST / login
export const login = async (req, res) => {
    try{
        const { email, password } = req.body;

        // Validar datos
        if (!email || !password) {
            return res.status(400).json({message: "Email y contraseña requeridos."});
        }

        //buscar usuario 
        const user = await User.findOne({ email });
        if (!user){
            return res.status(400).json({message: "Usuario incorrecto"});
        }

        // Comparar contraseñas
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400),json({message: "Contraseña incorrecta"});
        }

        // Generar Token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h"}
        );

        // Respuesta
       return res.json({
        token,
        user: {
            id: user._id,
            email: user.email,
        },
       });
    } catch(error){
        res.status(500).json({message:"Error en el login."});
    }
};