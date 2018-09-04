export default (req, res, next) => {
  res.sendError = (status = 404, message = 'Not found', entity = {}) => {
    const json = {
      ...entity,
      statusText: message,
      status: status
    }

    res.status(status)
    res.json(json)
  }

  next()
}
