// 所有请求都会调用
// 导出默认方法或者不带 .default
module.exports.default = (ctx)=> {
  console.log('ctx', ctx)
  return {
    code: 0,
    msg: 'ok',
    data: [1]
  }
}