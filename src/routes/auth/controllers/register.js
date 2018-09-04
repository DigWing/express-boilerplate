import User from '../../../models/user'

export default async ({ bodymen: { body: { email, name, password } } }, res, next) => {
  try {
    // если прислали пустое поле с именем, дропаем
    if (!name || !email || !password) {
      return res.sendError(400, 'Name field is empty')
    }

    // ищем юзера по мылу
    const user = await User.findUserByEmail(email)

    // если такой email уже зарегистрирован, дропаем
    if (user) {
      return res.sendError(403, 'User is already registered')
    }

    // создаем юзера
    await User.create({ email, password, name })

    // отсылаем успех
    return res.sendSuccess()
  } catch (err) {
    return next(err)
  }
}
