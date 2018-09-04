export default async ({ user }, res, next) => {
  try {
    return res.sendSuccess({ user: user.view() })
  } catch (err) {
    return next(err)
  }
}
