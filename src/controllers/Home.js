import Aluno from '../models/Aluno'

class HomeController {
  async index(req, res) {
    const novoAluno = await Aluno.create({
      nome: 'Bryan',
      sobrenome: 'Fardin',
      email: 'bryanfardin@gmail.com',
      idade: 24,
      peso: 72,
      altura: 1.85,
    })
    res.json(novoAluno)
  }
}

export default new HomeController()
