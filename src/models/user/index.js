import bcrypt from 'bcrypt'
import mongoose, { Schema } from 'mongoose'
import { env } from '../../config'

const userSchema = new Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true
  },

  password: {
    type: String,
    required: true,
    minlength: 6
  },

  name: {
    type: String,
    trim: true,
    default: null
  }
}, {
  timestamps: true
})

userSchema.methods = {
  view () {
    let fields = ['id', 'name', 'email', 'picture', 'createdAt']

    const view = fields.reduce((view, field) => {
      view[field] = this[field]
      return view
    }, {})

    return view
  },

  async authenticate (password) {
    const valid = await bcrypt.compare(password, this.password)

    return valid ? this : false
  },

  async changePassword (password) {
    this.password = password

    await this.save()

    return this
  }
}

userSchema.statics = {
  findUserByEmail (email) {
    return this.findOne({ email })
  }
}

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next()

  const rounds = env === 'test' ? 1 : 9

  bcrypt.hash(this.password, rounds).then((hash) => {
    this.password = hash
    next()
  }).catch(next)
})

const model = mongoose.model('User', userSchema)

export const schema = model.schema
export default model
