import { EntityRepository, Repository } from "typeorm";
import { Administrador } from "../models/Administrador"



@EntityRepository(Administrador)
class AdministradorRepository extends Repository<Administrador>{

    
}

export { AdministradorRepository }