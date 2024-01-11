import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs'

export default class User extends Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Campo name deve ter entre 3 e 255 caracteres',
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'Email ja existente',
        },
        validate: {
          isEmail: {
            msg: 'Email Invalido',
          },
        },
      },
      password_hash: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      password: {
        type: Sequelize.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [5, 50],
            msg: 'Campo senha deve ter entre 5 e 50 caracteres',
          },
        },
      },
    }, {
      sequelize,
    })

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcryptjs.hash(user.password, 8)
      }
    })

    return this
  }

  passwordIsValid(password) {
    return bcryptjs.compare(password, this.password_hash)
  }
}
