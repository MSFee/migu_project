import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite';
import { ImgListStore } from '../store/index';
import './index.less'

const id: number = 3779629;
const DetailSongList: React.FC<{}> = (props: any) => {
    // @ts-ignore
    const { songList } = ImgListStore();
    return <div className="songlist_deatil">
        {
            songList?.map((item: any) => {
                return <div className="song_info" key={item.key}>
                    <span className="index">{item.key}</span>
                    <div className="song_img" style={{
                        backgroundImage: `url(${item.picUrl})`
                    }}></div>
                    <div className="song_name">{item.songname}</div>
                    <div className="singer">{item.singer}</div>
                </div>
            })
        }
    </div>
}
export default observer(DetailSongList);