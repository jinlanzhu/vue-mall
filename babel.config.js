//这是项目发布阶段需要的babel配置
const prodPlugins = []
if (process.env.NODE_ENV === 'production') {
  prodPlugins.push('transform-remove-console')
}

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    //发布产品的插件数组
    //...表示展开数据项
    ...prodPlugins,
    "@babel/plugin-syntax-dynamic-import"
  ]
  // 'transform-remove-console'
}
