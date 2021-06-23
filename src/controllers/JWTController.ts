import { Request, Response, NextFunction } from "express"
import * as jwt from 'jsonwebtoken'

const SECRET = "ICETUFAM2021"
const EXPIRES = 900

class JWTController{
    
    createToken(user:any){
        const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: EXPIRES })
        return token
    }

    verifyToken(request: Request, response: Response, next: NextFunction){
        const token = request.headers['x-access-token']
        jwt.verify(String(token), SECRET, (error, decoded) => {
            if(error){
                return response.status(400).json({ error: "Token inválido" })
            }
            request.body.user_auth_id = decoded.id
            next();
        })
    }


}

export { JWTController }