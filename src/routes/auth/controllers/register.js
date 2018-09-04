import User from '../../../models/user'

export default async ({ bodymen: { body: { email, name, password } } }, res, next) => {
  try {
    // если прислали пустое поле с именем, дропаем
    if (!name) {
      return res.sendError(400, 'Name field is empty')
    }

    // создаем юзера
    const user = await User.create({ email, password, name })

    // если не создался, дропаем
    if (!user) {
      return res.sendError(404, 'User create error')
    }

    // отсылаем успех
    return res.sendSuccess()
  } catch (err) {
    return next(err)
  }
}
