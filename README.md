# Documention generator
This is a simple documentation generator, not in the sense that it generates documentation for you, but that it allows you to write it using markdown and then convert the markdown to PDF files using this project.

## Requirements
 - [NodeJS](https://nodejs.org/) version 15.9.0 (though old versions all the way down to 6.x should work, but are untested.)

## How to use
 1. Add your markdown files to the `pages/` directory.
 2. In your terminal, run `npm run generate`.
 3. The output PDF-files are then located in the `pdf/` directory.

## Supported Markdown syntax
Please see demo.md for examples.

## Recommended extensions for VSCode
 - [Markdown Table Prettifier](https://marketplace.visualstudio.com/items?itemName=darkriszty.markdown-table-prettify): This allows you to write table markdown quickly and afterwards format it to be prettier and easier to read.

## Libraries used
 - [Markdown PDF](https://github.com/alanshaw/markdown-pdf): Converts the markdown to PDF.
 - [Remarkable](https://github.com/jonschlinkert/remarkable): add more features to markdown and is used by Markdown PDF library.
 - [Highlight.js](https://highlightjs.org/): syntax highlighting for code blocks.