module.exports = {
  notFound() {
    return {
      code: 1,
      msg: 'not found',
      error: null,
    }
  },
  serverError(error) {
    return {
      code: 1,
      msg: 'server error',
      error: error.message ?? null,
    }
  }
}