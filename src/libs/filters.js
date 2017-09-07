// 过滤器规则
/** 启用停用描述
 *  @param {int} type => 1-启用  0-停用
 * */
exports.getUStatusDesc = (type) => {
  let desc = '启用'
  switch (type) {
    case 0: desc = '停用'
      break
    case 1: desc = '启用'
      break
  }
  return `${desc}`
}
