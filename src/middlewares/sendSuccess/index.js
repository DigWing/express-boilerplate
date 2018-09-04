export default (req, res, next) => {
  res.sendSuccess = (entity = {}, status = 200) => {
    const json = {
      ...entity,
      success: true
    }

    res.status(status)
    res.json(json)
  }

  next()
}
