<p align="center">
  <img src="./website/public/header.png" width="300" alt="AnyColor">
  <br>
  <a href="http://commitizen.github.io/cz-cli/"><img src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg" alt="Commitizen friendly"></a>
  <a href="https://chrome.google.com/webstore/detail/any-color/cmehpadapglhhambdiafddpfjdngonba"><img src="https://img.shields.io/chrome-web-store/v/cmehpadapglhhambdiafddpfjdngonba" alt="Chrome extension"></a>
  <a href="https://github.com/hankchiutw/any-color"><img src="https://img.shields.io/github/package-json/v/hankchiutw/any-color?label=package.json" alt="package.json version" ></a>
</p>
<p align="center">
<img src="./any-color-demo.gif" alt="AnyColor demo">
</p>

A [Chrome extension][webstore] that makes you pick up any pixel color from a web page.

- Inspired from Chrome devtool's color picker.
- Toggle the color inspector by Ctrl+Shift+A (Command+Shift+A for mac).
- Click and copy the color hex.

## Why?
Most of the color picker extensions have these drawbacks: 
- Most of them are aimed at picking DOM colors. Can not pick colors from an image.
- Not efficient when users only want to pick colors.

## How to use
[Install the extension][webstore] and toggle the color inspector by Ctrl+Shift+A (Command+Shift+A for mac). That's it.

## How it works
Mainly it uses [captureVisibleTab](https://developer.chrome.com/extensions/tabs#method-captureVisibleTab) API to the take the page screenshot. The image data is then rasterized and pixel colors are ready to use.

## License
[ Apache2 License ](LICENSE) © [hankchiu.tw](https://hankchiu.tw)

[webstore]: https://chrome.google.com/webstore/detail/any-color/cmehpadapglhhambdiafddpfjdngonba
