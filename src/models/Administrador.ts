import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity("administrador")
class Administrador{
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    nome: string
    
    @Column()
    usuario: string

    @Column()
    senha: string
    
    @CreateDateColumn()
    criado_em: Date

    @BeforeInsert()
    async generatePasswordHash(): Promise<void> {
      this.senha = await bcrypt.hashSync(this.senha, bcrypt.genSaltSync(10));
    }
}

export { Administrador }