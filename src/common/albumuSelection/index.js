import React from 'react';
import './index.less';
import PlayBtn from '../playBtn';
function AlbumuSelection(props) {
    const { songList, isAblumu } = props;
    function formatDate(time) {
        const date = new Date(time);
        const year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDate();
        month = month < 10 ? `0${month}` : month;
        day = day < 10 ? `0${day}` : day;
        return `${year}-${month}-${day}`;
    }
    return <div className="albumu_selection">
        <div className="main">
            {
                songList.map(item => <li
                    key={item.imgUrl} 
                    className="item-contain"
                    style={{backgroundImage: `url("https://cdnmusic.migu.cn/v3/static/img/index/album-cover${isAblumu ? '-gold' : ''}.png")`}}
                    >
                    <div
                        className="item_box"
                        style={{ backgroundImage: `url(${item.imgUrl})` }}
                    >
                    </div>
                    <PlayBtn></PlayBtn>
                    { isAblumu ? <span className="item_desc">数字专辑</span> : null}
                    <span className="update-time">{ isAblumu ? `发行：${item.saleNum}册` :  formatDate(item.time)}</span>
                    <div className="item_info">
                        <div className="albumn_name">{item.songName}</div>
                        <div className="singer">{item.singName}</div>
                    </div>
                </li>)
            }
        </div>
    </div>
}
export default AlbumuSelection;