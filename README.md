# AnyColor

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

A chrome extension let you pick up any pixel color from a web page.

- Inspired from chrome devtool's color picker.
- Toggle the color inspector by Ctrl+Shift+A (Command+Shift+A for mac).
- Click and copy the color hex.
- Additional color palette is available from extension popup.

## Why?
Most of the color picker extensions have these drawbacks: 
- Most of them are aimed at picking DOM colors. Can not pick image colors.
- Not efficient when I only want to pick colors.

## How to use
Install the extension and toggle the color inspector by Ctrl+Shift+A (Command+Shift+A for mac). That's it.

## How it works
Mainly it uses [captureVisibleTab](https://developer.chrome.com/extensions/tabs#method-captureVisibleTab) API to the take the page screenshot. The image data is rasterized and pixel colors are ready to use.

## License
[ Apache2 License ](LICENSE) © [hankchiu.tw](https://hankchiu.tw)
