# demo

## Project setup
```shell
vue create demo
cd demo
vue add electron-builder

npm i -D eslint
./node_modules/.bin/eslint --init
npm i -D husky
npm i -D commitizen cz-conventional-changelog standard-version
npm i --D @commitlint/{config-conventional,cli}
```



格式化代码

```
"eslint": "eslint src/**"
```

