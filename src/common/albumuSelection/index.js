import React, { useState } from 'react';
import './index.less';
import PlayBtn from '../playBtn';
function AlbumuSelection(props) {
    const { songList, isAblumu, noFlag } = props;
    const [imageUrl, setImageUrl] = useState('')
    function formatDate(time) {
        const date = new Date(time);
        const year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDate();
        month = month < 10 ? `0${month}` : month;
        day = day < 10 ? `0${day}` : day;
        return `${year}-${month}-${day}`;
    }
    function handleMouneEnter(url) {
        setImageUrl(url);
    }
    function handleMouseLeave() {
        setImageUrl('')
    }
    return <div className="albumu_selection">
        <div className="main">
            {
                songList.map(item => <li
                    key={item.imgUrl}
                    className="item-contain"
                    style={ !noFlag ? { backgroundImage: `url("https://cdnmusic.migu.cn/v3/static/img/index/album-cover${isAblumu ? '-gold' : ''}.png")` } : null}
                    onMouseEnter={() => handleMouneEnter(item.imgUrl)}
                    onMouseLeave={handleMouseLeave}
                >
                    <div
                        className="item_box"
                        style={{ backgroundImage: `url(${item.imgUrl})` }}
                    >
                    </div>
                    { imageUrl === item.imgUrl ? <PlayBtn></PlayBtn> : null }
                    {isAblumu ? <span className="item_desc">数字专辑</span> : null}
                    {!noFlag ? <span className="update-time">{isAblumu ? `发行：${item.saleNum}册` : formatDate(item.time)}</span> : null}
                    <div className="item_info">
                        {!noFlag ? <div className="albumn_name">{item.songName}</div> : null}
                        <div className="singer">{item.singName}</div>
                    </div>
                </li>)
            }
        </div>
    </div>
}
export default AlbumuSelection;