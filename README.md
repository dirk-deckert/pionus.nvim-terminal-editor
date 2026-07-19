# Pionus Neovim Terminal Editor

VS Code extension from Pionus GmbH for opening the active file in Neovim inside
a terminal editor. It also provides current-file diagnostic navigation and
commands for opening and closing rendered previews.

## Requirements

- macOS 15 Sequoia or newer, on Intel or Apple Silicon
- Visual Studio Code 1.100 or newer
- Neovim available on `PATH` or in a standard Homebrew location

## Development

```sh
npm install
npm test
npm run package
```

For source installation, the Pionus configuration repository clones or updates
this repository under `${PIONUS_VSCODE_REPOS_DIR:-$HOME/clouds/github-dirk-deckert}`
and symlinks it into the VS Code extensions directory.

## License

MIT. Copyright Pionus GmbH.
