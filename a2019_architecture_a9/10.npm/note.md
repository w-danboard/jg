## 包的初始化操作 （package.json）
- 模块 ： 文件模块 核心模块 第三方模块 npm来管理 前端依赖关系
- npm init   
```
#! /usr/bin/env node
"bin": {
    "my-pack": "./bin/www.js",
    "mp": "./bin/www.js"
},
```
- npm link 创建连接


如果想在命令行中使用命令 

C:\Users\test1\AppData\Roaming\npm\http-server -> C:\Users\test1\AppData\Roaming
\npm\node_modules\http-server\bin\http-server
C:\Users\test1\AppData\Roaming\npm\hs -> C:\Users\test1\AppData\Roaming\npm\node
_modules\http-server\bin\http-server

> nrm nvm(nvm-win  nvm use) npm

- 包全部包只在命令下用的 nrm
- 本地包在代码项目中使用的

> 可以在项目中使用  （项目依赖 --save 开发依赖 --save-dev） 同等依赖 可选依赖 打包依赖

可以在当前项目中使用，查找规则就是去node_modules查找

```javascript
npm install --production
```

## 版本和标识符 (major minor patch)
- ~(第二个版本不能变)  ^(第一个版本不能变)  >= <= 
- Alpha、Beta、RC
- npm和git同步 git tag  
```bash
npm version major
```

> 可以根据@符号安装指定版本

## scripts脚本和npx
- 开发项目时 我希望使用快捷命令
- npx 可以把当前目录下的.bin文件 放到path中  ,如果包不存在 可以帮我们下载 

## 发布包
- 登录到官方npm上
```bash
npm install nrm -g
nrm use npm
npm addUser
npm publish
npm unpublish --force
```
## 实现events模块

## Buffer的应用 fs应用 
- 文件夹遍历 
- 周末


