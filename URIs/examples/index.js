// 导出GET请求 /?id=123
const GET = ({ cookies })=> {
  console.log('get', cookies)
  return {
    code: 0,
    msg: 'ok',
    data: [1]
  }
}

// 导出POST请求
const POST = ({ req })=> {
  console.log('req', req)
  return {
    code: 0,
    msg: 'ok',
    data: []
  }
}

module.exports = {
  GET,
  POST,
  // PUT,
  // DELETE,
}