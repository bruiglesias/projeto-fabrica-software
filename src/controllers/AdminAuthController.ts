import { Request, Response } from "express"
import { getCustomRepository } from "typeorm"
import { AdministradorRepository } from "../repositories/AdministradorRepository"
import * as bcrypt from 'bcrypt'
import { JWTController } from "./JWTController"

const jwtController = new JWTController()

class AdminAuthController{

    async create(request: Request, response: Response){
        const { nome , usuario, senha } = request.body
        
        const administradorRepository = getCustomRepository(AdministradorRepository)
        const administradorAlreadyExists = await administradorRepository.findOne({ usuario })

        if(administradorAlreadyExists){
            return response.status(400).json({ error: "O usuário já existe"})
        }
        const administrador = administradorRepository.create({ nome, usuario, senha })
        await administradorRepository.save(administrador)
        administrador.senha = null
        return response.json(administrador)
    }

    async login(request: Request, response:Response){
        const { usuario, senha } = request.body
        const administradorRepository = getCustomRepository(AdministradorRepository)

        const administrador = await administradorRepository.findOne({ usuario: usuario })
        if (administrador) {

            const senhaValidada = await bcrypt.compare(senha, administrador.senha)
            
            if (senhaValidada) {
                const token = jwtController.createToken(administrador)
                administrador.senha = null
                response.status(200).json({ auth: true, token: token, administrador: administrador })
            } else {
                response.status(400).json({ error: "Senha inválida" })
            }

        } else {
            response.status(401).json({ error: "Usuário não existe" })
        }
    }

}

export { AdminAuthController }