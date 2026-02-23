import { Schema, model } from "mongoose";
// definimos el esquema del usuario en mongoose
const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);
//exportamos el modelo para usarlo en controladores
export default model("User",userSchema);