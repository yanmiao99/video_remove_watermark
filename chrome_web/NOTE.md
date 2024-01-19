### 说明文档

1. `popup,contents,options` 是作为上层应用, 只做展示, 不做任何处理
2. 所有的`页面`都应该放到`layout`中进行处理
3. 所有的`组件`都应该放到`components`中进行处理
4. 使用 `message,modal,notification` 需要引入 `App` 进行使用,如果不是组件,而是函数则引用 `AntdGlobal` 进行弹窗处理
5. 颜色主题的所有控制都放在了`theme`中进行处理
6. 资源文件的所有控制都放在了`assets`进行处理
7. 页面和组件命名遵从 `Details/index.tsx` 的方式
