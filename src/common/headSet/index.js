// 耳机图标
import React from 'react';
import './index.less';
function HeadeSet(props) {
    const { playNum } = props;
    function formatNum() {
        if (playNum < 10000) {
            return `${playNum}`;
        } else {
            const str = `${playNum}`;
            let num = playNum;
            num = num / Math.pow(10, str.length);
            num = num.toFixed(str.length - 3);
            num = num * Math.pow(10, str.length - 4);
            return `${num.toFixed(1)}W`
        }
    }
    return (<div className="heade_set">
        <svg t="1606718532032" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7943" width="200" height="200"><path d="M313.856 884.736H189.952c-22.016 0-40.448-17.92-40.448-40.448V599.04c0-22.016 17.92-40.448 40.448-40.448h123.904c22.016 0 40.448 17.92 40.448 40.448v245.248c0 22.528-17.92 40.448-40.448 40.448z m-111.616-52.224H302.08v-220.672H202.24v220.672zM822.272 884.736h-123.904c-22.016 0-40.448-17.92-40.448-40.448V599.04c0-22.016 17.92-40.448 40.448-40.448h123.904c22.016 0 40.448 17.92 40.448 40.448v245.248c0 22.528-17.92 40.448-40.448 40.448z m-111.616-52.224h99.84v-220.672h-99.84v220.672z" fill="#ffffff" p-id="7944"></path><path d="M862.72 751.616h-52.224V497.152c0-167.424-136.192-304.128-304.128-304.128S202.24 329.728 202.24 497.152v254.464H150.016V497.152c0-196.608 159.744-356.352 356.352-356.352s356.352 159.744 356.352 356.352v254.464z" fill="#ffffff" p-id="7945"></path></svg>
        <span className="iconfont">{formatNum()}</span>
    </div>)
}
export default HeadeSet;