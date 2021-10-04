import { Request, Response } from "express";
import knex from "../database/connection";

export default {
  async create(req: Request, res: Response) {
    const { titulo, descricao, categoria, imagem } = req.body
    const data = { titulo, descricao, categoria, imagem }
    await knex('assinaturas').insert(data)
    return res.status(201).json({ data: data })
  },

  async list(req: Request, res: Response) {
    let assinaturas =  await knex('assinaturas').orderBy('id')
    return res.status(200).json({data: assinaturas})
  },

  async find(req: Request, res: Response) {
    const { id } = req.params
    const user = await knex('assinaturas').where({ id })
    return res.status(200).json(user)
  },
  async update(req: Request, res: Response) {
    const { id } = req.params
    const { titulo, categoria, descricao, imagem } = req.body

    const data = { titulo, categoria, descricao, imagem }
    
    await knex('assinaturas').update(data).where({ id })
    const assinatura = await knex('assinaturas').where({ id })
    
    return res.status(200).json({data: assinatura})
  },

  async delete(req: Request, res: Response) {
    const { id } = req.params
    await knex('assinaturas').delete().where({ id })
    return res.status(200).json({ message: "Registro excluido com sucesso!"})
  }
}
