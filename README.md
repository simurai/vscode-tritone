# VS Code theme TriTone

![TriTone theme](https://user-images.githubusercontent.com/378023/80668639-595e9e00-8add-11ea-8673-4a481cc7e2dd.png)

## Install

1. Go to [VS Marketplace](https://marketplace.visualstudio.com/)
2. Click on the "Install" button

## Override this theme

To quickly test something, you can also override this (or any other) theme in your personal config file. Please follow the guide in the [color theme](https://code.visualstudio.com/api/extension-guides/color-theme) documentation.

## Contribute

1. Clone and open this [repo](https://github.com/simurai/vscode-tritone) in VS Code
2. Run `npm install` to install the dependencies and run `npm start` to run the converter.
3. Press `F5` to open a new window with your extension loaded
4. Open `Code > Preferences > Color Theme` [`⌘k ⌘t`] and pick the "TriTone" themes.
5. Make changes to the [`/src/theme.js`](https://github.com/simurai/vscode-tritone/blob/master/src/theme.js) file.
    - **UI**: For all changes to the "outer UI", like (status bar, file navigation etc.), take a look at the [Theme Color](https://code.visualstudio.com/api/references/theme-color) reference.
    - **Syntax**: For changes to the "code highlighting", examine the syntax scopes by invoking the [`Developer: Inspect Editor Tokens and Scopes`](https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide#scope-inspector) command from the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on Mac) in the Extension Development Host window.
6. Commit your changes and open a PR.

Note:

- Changes to the theme files are automatically applied to the Extension Development Host window, so no reloading should be necessary.
