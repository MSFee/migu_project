import React, { Fragment } from 'react'

import './index.less';

function PlayBtn(props) {
    const { isMini } = props;
    return <Fragment>
        <div className="play_btn" style={{width: isMini ? '30px' : '55px',height: isMini ? '30px' : '55px'}}/>
        <img 
            className="play" 
            src="https://cdnmusic.migu.cn/v3/static/img/common/default/btn-play.png"
            style={{width: isMini ? '40px' : '55px',height: isMini ? '40px' : '55px'}}
            ></img>
    </Fragment>
}
export default PlayBtn;