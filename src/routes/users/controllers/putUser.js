import User from '../../../models/user'
import bcrypt from 'bcrypt'

export default async ({ bodymen: { body: { oldPassword, newPassword, ...body } }, user, params }, res, next) => {
  try {
    // если пользователь хочет сменить пароль
    if (oldPassword) {
      // проверка на валидность старого пароля
      const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password)
      if (!isOldPasswordValid) {
        return res.sendError(400, 'Old password is invalid')
      }

      // проверка, прислал ли новый пароль
      if (!newPassword) {
        return res.sendError(400, 'New password is empty')
      }

      // меняем пароль
      await user.set({ password: newPassword }).save()
    }

    // обновляем юзера
    const updatedUser = await User.findByIdAndUpdate(user.id, { $set: { ...body } }, { new: true })

    return res.sendSuccess({ user: updatedUser.view() })
  } catch (err) {
    return next(err)
  }
}
