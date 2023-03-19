# demo

## 一、运维事宜

### 1.1 Vue + Electron 

此项目是 `vue + electron` 框架，使用如下命令建立

```shell
vue create demo
cd demo
vue add electron-builder
```

可以利用如下命令实现构建并运行：

```shell
npm run electron:serve
```

### 1.2 Code Style

使用 `eslint` 控制代码风格，首先按照 `eslint` 在开发环境依赖中，并进行初始化。其中代码风格为 `eslint-config-standard` ，其介绍文档在这里：https://github.com/standard/standard/blob/master/docs/README-zhcn.md

```shell
npm i -D eslint
./node_modules/.bin/eslint --init
```

然后 `package.json` 中补充脚本方便格式化，格式化对象包括 `js, vue`。同时除了检测码风问题外，还通过 `--fix` 对代码风格进行自动修复。 

```json
// package.json
{
    "scripts" : {
        "eslint": "eslint \"./src/**.{js,vue}\" --fix",
    }
}
```

在 `vscode` 中安装 `ESLint` 插件，并通过 `./.vscode/settings.json` 进行配置，使其可以保存是自动格式化。

```json
// settings.json
{
    "eslint.format.enable": true,
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    }
}
```

### 1.3 Git Commit Style

利用 `commitizen cz-conventional-changelog` 进行 `commit` 信息的管理

```shell
npm i -D commitizen cz-conventional-changelog
```



## Project setup
```shell



npm i -D husky
 standard-version
npm i -D @commitlint/{config-conventional,cli}
```







格式化代码

```
"eslint": "eslint src/**"
```

