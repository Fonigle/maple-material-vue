/// <reference path="../@types/svgtofont/index.d.ts" />

import {
    createSVG,
    createTTF,
    createWOFF,
    createWOFF2,
    copyTemplate
} from "svgtofont/src/utils";

import * as path from 'path';
import * as fs from 'fs';

const checkDirExist = (folderpath: string) => {
    return new Promise((resolve, reject) => {
        const pathArr = folderpath.split('/');

        let _path = '';

        try {
            for (let item of pathArr) {
                _path += `/${item}`;
                !fs.existsSync(path.resolve(`./${_path}`))
                    && fs.mkdirSync(path.resolve(`./${_path}`))
            }
            resolve();
        }
        catch (err) {
            reject(err);
        }
    })
}

const outputPath = 'dev/_intermediate/iconfonts';

checkDirExist(outputPath).then(() => {
    const options = {
        src: path.resolve('dev/assets/icon-svgs'), // svg 图标目录路径
        dist: path.resolve('dev/_intermediate/iconfonts'), // 输出到指定目录中
        fontName: 'maple-icon', // 设置字体名称
        clssaNamePrefix: 'icon',
        svgicons2svgfont: {
            fontHeight: 2400,
            normalize: true
        },
    }

    let cssString = new Array<string>();

    createSVG(options) // SVG => SVG Font
        .then((UnicodeObject: any) => {
            Object.keys(UnicodeObject).forEach(name => {
                let _code = UnicodeObject[name];
                cssString.push(`.${options.clssaNamePrefix}-${name}:before { content: "\\${_code.charCodeAt(0).toString(16)}"; }\n`);
            });
        })
        .then(() => createTTF(options)) // SVG Font => TTF
        .then(() => createWOFF(options)) // TTF => WOFF
        .then(() => createWOFF2(options)) // TTF => WOFF2
        .then(() => {
            const font_temp = path.resolve(__dirname, "iconfont-builder-template");
            return copyTemplate(font_temp, options.dist, {
                fontname: options.fontName,
                fontsize: '24px',
                cssString: cssString.join(""),
                timestamp: new Date().getTime(),
                prefix: options.clssaNamePrefix || options.fontName
            });
        })
})


