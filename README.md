# Aplikácia

Zdrojový kód aplikácie pre nákladový kontroling

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Project Setup

### Install

```bash
$ npm install
```

### Development

```bash
$ npm dev
```

### Build

```bash
# For windows
$ npm build:win

# For macOS
$ npm build:mac

# For Linux
$ npm build:linux
```

### Check .exe file signature

```bash
osslsigncode verify -in path/to/yourfile.exe
```
