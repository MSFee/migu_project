import React, { Fragment, useState, useEffect } from 'react'
import AlbumuSelection from '../../../common/albumuSelection';
import service from '../../../http';

function NewDiscShelve() {
    const [songList, setSongList] = useState([]);
    useEffect(() => {
        getData();
    }, [])
    function getData() {
        service({
            url: '/top/album',
            methods: 'get',
            params: {
                limit: 10
            }
        }).then(res => {
            const weekData = res.slice(0, 10);
            let singArr = [];
            const temSongArr = [];
            weekData.map(item => {
                singArr = [];
                item.artists.map(person => {
                    singArr.push(person.name);
                })
                const obj = {
                    songName: item.name, // 歌曲名称
                    time: item.publishTime, // 发布时间
                    imgUrl: item.picUrl, // 图片url
                    singName: singArr.join(' / '), // 歌手名称
                }
                temSongArr.push(obj);
            })
            setSongList([...temSongArr]);
        })
    }
    return <Fragment>
        <AlbumuSelection songList={songList}></AlbumuSelection>
    </Fragment>
}
export default NewDiscShelve;