import jwt from "jsonwebtoken";

export const authMiddlware = (req, res, next,) => {
    try{
        // Tomar header Authorization
        const authHeader = req.headers.authorization;

        // si no hay token 
        if (!authHeader){
            return res.estatus(401).json({message: "Token requerido."});
        }

        // Formato : Bearer token : extrae el token limpio
        const token = authHeader.split(" ")[1];

        // Verificar token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Guardar id del usuario en la request
        req.userId = decoded.id;

        // Continuar
        next();
        
    } catch (error){
        return res.status(401).json({message: "Token inválido."});
    }
};