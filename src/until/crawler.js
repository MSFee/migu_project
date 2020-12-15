const http = require('http');
const https = require('https');
const cherrio = require('cheerio');
const iconv = require('iconv-lite')

const url = "https://music.migu.cn/v3";
const rules = "#banner #carousel li a img";
const parsingRules = 'src';

const getData = (url) => {
    const htmlData = [];
    let htmlDataLength = 0;
    return new Promise(resolve => {
        https.get(url, res => {
            res.on('data', chunk => {
                htmlData.push(chunk);
                htmlDataLength += chunk.length;
            })
            res.on('end', () => {
                const bufferHtmlData = Buffer.concat(htmlData, htmlDataLength);
                const decodeHtmlData = iconv.decode(bufferHtmlData, 'utf-8');
                return resolve(decodeHtmlData);
            })
        })
    })
}
const analyticalData = (data, rules, parsingRules) => {
    const dataList = []
    const $ = cherrio.load(data, { decodeEntities: false });
    $(rules).each((index, item) => {
        const $item = $(item);
        dataList.push(`https:${$item.attr(parsingRules)}`);
    })
    return dataList;
}

getData(url).then(res => {
    let result = analyticalData(res, rules, parsingRules);
    return result
})

class crawler {
    getSongList() {
        return getData(url).then(res => {
            let result = analyticalData(res, rules, parsingRules);
            return result
        })
    }
}
export default crawler;