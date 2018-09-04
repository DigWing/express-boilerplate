import { sign } from '../../../services/jwt'
import User from '../../../models/user'

export default async ({ bodymen: { body: { email, password } } }, res, next) => {
  try {
    // ищем юзера по мылу
    let user = await User.findUserByEmail(email)

    // если юзер не найден, дропаем
    if (!user) {
      return res.sendError(404, 'User not found')
    }

    // аутентификация по паролю (совпал/нет)
    user = await user.authenticate(password, user.password)

    // аутентификация фейл - дропаем
    if (!user) {
      return res.sendError(401, 'Unauthorized')
    }

    // аутентификация прошла - получаем токен
    const token = await sign(user.id)

    // возвращаем всю инфу о юзере + токен
    return res.sendSuccess({ user: {...user.view(), token} })
  } catch (err) {
    return next(err)
  }
}
