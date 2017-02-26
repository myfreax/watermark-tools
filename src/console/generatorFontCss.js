/**
 * Created by Freax on 17-1-20.
 * @blog http://www.myfreax.com
 */
const fontsConfig = require('../config/font');
const appConfig = require('../config/app');
const fs = require('fs');
const path = require('path');

/**
 *  生成字体模板样式
 * @param font
 * @returns {string}
 */
let template = font => {
    let urls = font.src.map(url => {
        url = url.toString();
        if (url.length > 0) {
            return `url(${url}) format('${url.substr(parseInt(url.lastIndexOf('.')) + 1)}')`
        }
    }).join(',');
    return `@font-face {font-family: ${font.name};src: ${urls};}`;

};

/**
 * 生成css文件
 * @returns {Promise.<void>}
 */
async function generate() {
    try {
        let content = fontsConfig.map(font => {
            return template(font);
        }).join('');
        await new Promise((resolve, reject) => {
            fs.writeFile(path.resolve(process.cwd(), appConfig.fontCssPath), content, 'utf8', (err, data) => {
                if (err)return reject(err);
                return resolve(true);
            });
        });
        console.info('字体css文件以重新生成');
    } catch (e) {
        console.info(e.stack);
    }
}

generate();