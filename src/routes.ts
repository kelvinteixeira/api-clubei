import { Router } from "express";
import multer from 'multer'

import AssinaturasController from "./controllers/AssinaturasController";
import CategoriasController from "./controllers/CategoriasController";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })

const routes = Router()

routes.post('/api-clubei/assinaturas', upload.single('assinatura_img'), AssinaturasController.create)
routes.get('/api-clubei/assinaturas', AssinaturasController.list)
routes.put('/api-clubei/assinaturas/:id', AssinaturasController.update)
routes.get('/api-clubei/assinaturas/:id', AssinaturasController.find)
routes.delete('/api-clubei/assinaturas/:id', AssinaturasController.delete)

routes.get('/api-clubei/categorias', CategoriasController.list)
routes.get('/api-clubei/categorias/:id_categoria/assinaturas', CategoriasController.find)

export default routes