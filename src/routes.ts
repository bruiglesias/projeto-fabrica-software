import { Router } from 'express'
import { UserController } from './controllers/UserController'

const router = Router()
const userController = new UserController();

// GET => Buscar
// POST => Salvar
// PUT => Alterar
// DELETE => Deletar
// PATCH => Alteração específica

router.post("/users", userController.create)
router.get("/users", userController.show)

export { router }

