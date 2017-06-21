// 系统右侧导航列表数据
let menus = []
try {
  menus = window.localStorage.getItem('menus')
  menus = JSON.parse(menus)
  Error
} catch (e) {
  menus = [
    {
      'id': 1,
      'name': '基本信息',
      'url': 'javascript:',
      'children': [
        { 'id': 10, 'name': '选项一', 'url': '/page1', 'auths': '1_2_6' },
        { 'id': 11, 'name': '选项二', 'url': '/page2', 'auths': '1_2_6' }
      ]
    }
  ]
}
export default menus
