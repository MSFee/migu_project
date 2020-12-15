// 首页歌单推荐
import React, { useEffect, useState } from 'react'
import service from '../../../http/index';
import HeadSet from '../../../common/headSet';
import PlayBtn from '../../../common/playBtn';

import './index.less'
function LaylistRecom() {
    const [songList, setSongList] = useState([]);
    const [leftImageInfo, setLeftImageInfo] = useState({});
    useEffect(() => {
        getSongList();
    }, [])
    function getSongList() {
        service({
            url: 'personalized',
            method: 'get',
            params: { limit: 10 }
        }).then(res => {
            setSongList([...res]);
            const temObj = res[Math.floor(Math.random() * 10)];
            setLeftImageInfo({ ...temObj })
        })
    }
    return <div className="laylist_recom">
        <div className="laylist_recom_main">
            <div className="left">
                <div className="container">
                    <div className="mask"></div>
                    <img className="back_fliter" src={leftImageInfo.picUrl}></img>
                    <div className="container_gd">
                        <div className="span_in">专属推荐歌单</div>
                        <img src={leftImageInfo.picUrl}></img>
                        <div className="bdata-title">
                            {leftImageInfo.name}
                        </div>
                    </div>
                </div>
            </div>
            <div className="right">
                {
                    songList.map(item => {
                        return <li
                            className="item_box"
                            key={item.id}>
                            <div className="item_content"
                                style={{
                                    backgroundImage: `url(${item.picUrl})`
                                }}
                            >
                                <HeadSet playNum={item.playCount}></HeadSet>
                                <PlayBtn></PlayBtn>
                            </div>
                            <span className="item_title">{item.name}</span>
                        </li>
                    })
                }
            </div>
        </div>
    </div>
}
export default LaylistRecom;