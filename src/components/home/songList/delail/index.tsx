import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite';
import { ImgListStore } from '../store/index';
import service from '../../../../http/index';
import './index.less'

let currentSongList: Array<any> = [];
const id: number = 3779629;
class SongInfo { key!: string | number; songname: any; picUrl: any; singer!: string; }
const DetailSongList: React.FC<{}> = (props: any) => {
    // const {} = ImgListStore();
    const [songList, setSongList] = useState<SongInfo[]>();
    const checkSongList = (): void => {
        const temArr: Array<any> = currentSongList.slice(0, 30);
        let index: number = 1;
        let arr: SongInfo[] = [];
        temArr.map(item => {
            const obj = {
                key: index < 10 ? `0${index}` : index,
                songname: item.name,
                picUrl: item.al.picUrl,
                singer: formatSingerName(item.ar),
            }
            index = index + 1;
            arr.push(obj);
        })
        setSongList([...arr]);
    }
    const formatSingerName = (arr: Array<any>): string => {
        const temArr: Array<string> = [];
        arr.map(item => {
            temArr.push(item.name);
        })
        return temArr.join('/');
    }
    const getSongList = (): void => {
        service.get(`/playlist/detail?id=${id}`).then((res: any) => {
            currentSongList = res.tracks.slice(0, 90);
            checkSongList();
        })
    }
    useEffect(() => {
        if (!currentSongList.length) { // 已经请求过数据
            getSongList();
        }
        checkSongList();
    }, [])
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