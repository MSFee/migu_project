import React, { useState, useEffect } from 'react'
import './index.less'
import PlayBtn from '../../../common/playBtn';
import service from '../../../http';

const cateGory = [
    {
        label: '华语',
        value: 7,
    }, {
        label: '欧美',
        value: 96,
    }, {
        label: '日本',
        value: 8,
    }, {
        label: '韩国',
        value: 16
    }
]
const songMap = new Map(); // 定义缓存歌曲map
let count = 0; // 定义请求次数
function NewCourier() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [type, setType] = useState(7)
    const [songList, setSongList] = useState([]);
    const [leftImgList, setLeftImgList] = useState([]);
    useEffect(() => {
        getSongList(type)
    }, [])
    function getSongList(type) {
        service({
            url: 'top/song',
            methods: 'get',
            params: {
                type,
            }
        }).then(res => {
            songMap.set(type, res);
            changeType(type);
            count++;
        })
    }
    // 格式化时间
    function formattTime(time) {
        const ms = time / 1000;
        let minute = Math.floor(ms / 60);
        let second = Math.floor(ms % 60);
        minute = minute > 10 ? minute : `0${minute}`;
        second = second > 10 ? second : `0${second}`;
        return `${minute}:${second}`;
    }
    function changeType(value) {
        if(value === type && count) {
            return;
        }
        setType(value);
        if(songMap.has(value)) {
            const temArr = [...songMap.get(value)];
            const songArr = temArr.slice(0, 8);
            const retArr = [];
            let singName = [];
            songArr.map(item => {
                singName = []
                item.artists.map(person => {
                    singName.push(person.name);
                })
                const obj = {
                    id: item.id,
                    time: formattTime(item.duration), // 播放时间
                    name: item.name, // 歌曲名称
                    imgUrl: item.album.picUrl, // 图片URl
                    singname: singName.join(' / '),
                }
                retArr.push(obj);
            })
            const leftList = [];
            for(let i = 0; i < 6; i++) {
                leftList.push(retArr[i].imgUrl);
            }
            setLeftImgList([...leftList]);
            setSongList([...retArr]);
        }else {
            getSongList(value);
        }
    }
    function handleMouseEnter(value) {
        setCurrentIndex(value);
    }
    function handleMouseLeave() {
        setCurrentIndex(0);
    }
    return <div className="new_courier">
        <div className="new_courier_bg"></div>
        <div className="new_courier_left">
            <div className="staticImgBox">
                {
                    leftImgList.map(item => <img key={item} src={item}></img>)
                }
            </div>
            <div className="play_all_songs">全部播放</div>
        </div>
        <div className="new_courier_right">
            <div className="top_category">
                {
                    cateGory.map(item => <li
                        style={{color: type === item.value ? '#e91e63' : '#000'}}  
                        onClick={() => changeType(item.value)} 
                        key={item.value}>{item.label}</li>)
                }
            </div>
            <div className="container">
                {
                    songList.map((item, index) => <li 
                                onMouseEnter={() => handleMouseEnter(index + 1)} 
                                onMouseLeave={handleMouseLeave}
                                key={item.id} 
                                className="item_column">
                        <div className="item_box">
                            <img 
                            className={[
                                currentIndex === index + 1 ? 'selection' : null,
                                "img_full"
                            ].join(' ')}
                                src={item.imgUrl}></img>
                            { currentIndex === index + 1 ? <PlayBtn isMini={true}></PlayBtn> : null}
                        </div>
                        <div 
                            className="item_info"
                            style={{ backgroundColor: currentIndex === index + 1 ? 'rgb(230, 230, 230)' : null }}
                            >
                            <span className="song_name">{item.name}</span>
                        <span className="singger">{item.singname}</span>
                        </div>
                        <div className="item_time">{item.time}</div>
                    </li>)
                }
            </div>
        </div>
    </div>
}
export default NewCourier;