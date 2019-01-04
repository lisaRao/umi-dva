# 重构

###  安装依赖包

  ```bash
    yarn add
  ```
  或者

  ```bash
    npm install 
  ```

### 运行&发布
```bash
  npm run start
```

### 主要技术栈 umi(1.3) + dva + antd-mobile
- [umi官网](https://v1.umijs.org/)
- [dva官网](https://dvajs.com)
- [antd-mobile](https://mobile.ant.design/index-cn)



### 项目结构说明

```
├── dist/                          // 默认的 build 输出目录
├── mock/                          // mock 文件所在目录，基于 express
├── src/                           // 源码目录
│ ├── assets/                      // 静态资源，编译时copy至dist目录
│ ├── components/                  // UI组件及UI相关方法 (通用)
│ ├── layouts/                     // router layouts设置
│ ├── models/                      // 全局数据模型(默认加载)
│ ├── pages/                       // 页面目录
│ │ ├── .umi/                      // dev 临时目录，需添加到 .gitignore
│ │ ├── .umi-production/           // build 临时目录，会自动删除
│ │ ├── coupon/                    // 优惠券模块
│ │ ├── home/                      // 首页模块
│ │ ├── order/                     // 订单
│ │ ├── .../                       // ...
│ ├── services/                    // 公共数据接口
│ ├── utils/                       // 工具函数
│ │ ├── request.js                 // 异步请求函数
│ │ ├── flexlib.js                 // rem使用工具
│ │ ├── constants.js               // 整个站点常量定义
│ │ └── cache.js                   // localstrorage/cookie..(get/set/del..)
│ ├── global.less                  // 约定的全局样式文件，自动引入
├── .editorconfig                  // 代码编写配置
├── .eslintrc                      // eslint配置
├── .gitignore                     // git配置
├── .umirc.js                      // umi 配置(见官网)
├── .webpackrc.js                  // webpack配置
├── package.json                   // 项目信息
├── README.md                      // 项目描述
└── yarn.lock                      // 项目信息
```


### 快速开发
  - 直接在`./src/pages`下创建模块目录包格式如下即一个dva的小目录包含`components`,`models`,`services`, umi会自动生成路由

  ```js
  + pages/
    + coupon/     
      + components
        - index.js
        - history.js
        - index.less
      + models
        - coupon.js
      + services
        - coupon.js 
    - history.js
    - index.js   //(如果使用自动生成路由这个文件必须存在)
  ```
  - 如需自定义配置 可参看官网配置或者询问 lisa

