import User from '../models/User'

class UserController {
  async store(req, res) {
    try {
      const novoUser = await User.create(req.body)
      return res.json(novoUser)
    } catch (e) {
      console.log(e)
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      })
    }
  }

  // Index
  async index(req, res) {
    try {
      const users = await User.findAll()
      return res.json(users)
    } catch (e) {
      return res.json(null)
    }
  }

  // Show
  async show(req, res) {
    try {
      const user = await User.findByPk(req.params.id)
      return res.json(user)
    } catch (e) {
      return res.json(null)
    }
  }

  // Update
  async update(req, res) {
    try {
      if (!req.params) {
        return res.status(400).json({
          erros: ['ID Não Enviado'],
        })
      }

      const user = await User.findByPk(req.params.id)

      if (!user) {
        return res.status(400).json({
          errors: ['Usuario Não Existe'],
        })
      }

      const novosDados = await user.update(req.body)

      return res.json(novosDados)
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      })
    }
  }

  // Delete
  async delete(req, res) {
    try {
      if (!req.params) {
        return res.status(400).json({
          erros: ['ID Não Enviado'],
        })
      }

      const user = await User.findByPk(req.params.id)

      if (!user) {
        return res.status(400).json({
          errors: ['Usuario Não Existe'],
        })
      }

      await user.destroy()

      return res.json(user)
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      })
    }
  }
}

export default new UserController()
