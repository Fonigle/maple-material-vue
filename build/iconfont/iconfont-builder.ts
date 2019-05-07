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

const checkDir = () => {
    return new Promise((resolve) => {
        fs.exists(path.resolve('./_intermediate'), exists => {
            if (!exists) {
                fs.mkdirSync(path.resolve('./_intermediate'));
                fs.mkdirSync(path.resolve('./_intermediate/iconfonts'));
                resolve();
            }
            else {
                fs.exists(path.resolve('./_intermediate/iconfonts'), exists => {
                    if (!exists) {
                        fs.mkdirSync(path.resolve('./_intermediate/iconfonts'));
                        resolve();
                    }
                    else {
                        resolve();
                    }
                })
            }
        });
    })
}

checkDir().then(() => {
    const options = {
        src: path.resolve('src/assets/icon-svgs'), // svg 图标目录路径
        dist: path.resolve('_intermediate/iconfonts'), // 输出到指定目录中
        fontName: 'maple-icon', // 设置字体名称
        clssaNamePrefix: 'mpi',
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


