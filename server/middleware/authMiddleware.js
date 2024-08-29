import jwt from "jsonwebtoken"

export const authMiddleware = async(req, res, next) =>{
    return res.status(400).json({message: "Access denied"})
    // checking login status by token
    const token = req.cookies.token;
    const id = req.params.id;

    if(!token){
        return res.status(400).json({message: "Login first"});
    }

    try {
        // verify token if user login
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = decodedToken.userId

        // checking authorization of user
        if(id !== decodedToken.userId){
            return res.status(400).json({message: "Access denied"})
        }
        next();
    } catch (error) {
        res.status(500).json({error: error})
    }
}