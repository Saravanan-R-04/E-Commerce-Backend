import jwt from 'jsonwebtoken';
export const authMiddleware = async(req,res,next)=>{
    try{
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer")){
            return res.status(401).json({
                success:false,
                message:"UnAuthorized"
            })
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token,"secretkey");

        req.user = decoded;

        console.log(req.user.role)

        next();
    }
    catch(error)
    {
        res.status(401).json({
            success:false,
            message:"Unauthorized"
        })
    }
}