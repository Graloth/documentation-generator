import markdownPdf from "markdown-pdf";
import { readdir, createReadStream, createWriteStream } from "fs";
import { getLanguage, highlight as _highlight, highlightAuto } from "highlight.js";
import { join, extname, basename as _basename, dirname } from "path";

const directoryPath = join(__dirname, 'pages');

const consoleFormat = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    underscore: "\x1b[4m",
    blink: "\x1b[5m",
    reverse: "\x1b[7m",
    hidden: "\x1b[8m",
    color: {
        text: {
            black: "\x1b[30m",
            red: "\x1b[31m",
            green: "\x1b[32m",
            yellow: "\x1b[33m",
            blue: "\x1b[34m",
            magenta: "\x1b[35m",
            cyan: "\x1b[36m",
            white: "\x1b[37m"
        },
        background: {
            black: "\x1b[40m",
            red: "\x1b[41m",
            green: "\x1b[42m",
            yellow: "\x1b[43m",
            blue: "\x1b[44m",
            magenta: "\x1b[45m",
            cyan: "\x1b[46m",
            white: "\x1b[47m"
        }
    }
}

readdir(directoryPath, function (err, files) {
    console.log(consoleFormat.color.text.blue, 'Generating PDF files from Markdown...', consoleFormat.reset);

    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }

    files.forEach(function (file) {
        let fileExt = extname(file);
        if (fileExt != ".md") {
            return;
        }
        const resultFile = changeExtension(file, '.pdf');
        console.log(consoleFormat.color.text.cyan, '- pages/' + file + ' -> pdf/' + resultFile, consoleFormat.reset);
        createReadStream("pages/" + file)
            .pipe(markdownPdf({
                cssPath: "style/pdf.css",
                paperBorder: "1cm",
                remarkable: {
                    preset:         "full",
                    html:           false,
                    xhtmlOut:       true,
                    breaks:         false,
                    typographer:    true,
                    highlight:      function (str, lang) {
                        if (lang && getLanguage(lang)) {
                            try {
                                return _highlight(lang, str).value;
                            }
                            catch (error) {}
                        }

                        try {
                            return highlightAuto(str).value;
                        }
                        catch (error) {}

                        return '';
                    }  
                }
            }))
            .pipe(createWriteStream("pdf/" + resultFile));
    });
    
    console.log(consoleFormat.color.text.green, 'Generation successful!', consoleFormat.reset);
});

function changeExtension(file, extension) {
    const basename = _basename(file, extname(file))
    return join(dirname(file), basename + extension)
}