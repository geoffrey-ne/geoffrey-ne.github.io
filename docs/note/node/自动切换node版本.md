# 自动切换 node 版本

## 安装 zsh

参考：[https://github.com/ohmyzsh/ohmyzsh](https://github.com/ohmyzsh/ohmyzsh)

## vim ~/.zshrc

```bash
# auto check node version
autoload -U add-zsh-hook
load-nvmrc() {
if [[ -f .nvmrc && -r .nvmrc  ]]; then
    nvm use
fi
}
add-zsh-hook chpwd load-nvmrc
load-nvmrc
```

## 配置`.nvmrc`版本

最后在项目根目录下配置.nvmrc 指定希望的 node 版本即可。

如：`v16.4.2`

参考：[https://segmentfault.com/a/1190000007174278](https://segmentfault.com/a/1190000007174278)
