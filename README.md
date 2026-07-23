# Ripe for VS Code

Syntax highlighting for the [Ripe](https://www.ripe-lang.org) programming language, a systems programming language.

## Features

- Syntax highlighting for `.rp` files
- Comment toggling (`//` and `/* */`)
- Bracket matching and auto closing pairs
- Code folding with `// region` and `// endregion` markers

## Installation

Install from the VS Code Marketplace by searching for "Ripe", or build it from source:

```sh
npx @vscode/vsce package
code --install-extension vscode-ripe-*.vsix
```

## License

MIT. See [LICENSE](LICENSE).
