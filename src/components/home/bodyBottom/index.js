import React from 'react'
import './index.less';

function BodyBottom() {
    return (
        <div className="body_bottom_container"> 
        <div className="top">
            本项目纯属个人娱乐
        </div>
        <div className="bottom">
            数据来源 <a href="https://binaryify.github.io/NeteaseCloudMusicApi/" target="_blank">网易云接口</a>
        </div>
        </div>
    )
}

export default BodyBottom;