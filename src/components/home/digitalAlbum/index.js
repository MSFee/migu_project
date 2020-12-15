import React, { Fragment, useEffect, useState } from 'react'
import service from '../../../http';
import AlbumuSelection from '../../../common/albumuSelection';

function DigitalAlbum() {
    const [songList, setSongList] = useState([]);
    useEffect(() => {
        getSongList();
    }, []);
    function getSongList() {
        service({
            url: 'album/songsaleboard',
            methods: 'get',
            params: {
                limit: 5,
                type: 'week',
                albumType: 0
            }
        }).then(res => {
            const temArr = res.slice(0, 5);
            let retArr = [];
            temArr.map(item => {
                const obj = {
                    songName: item.albumName,
                    singName: item.artistName,
                    imgUrl: item.coverUrl,
                    saleNum: item.saleNum
                };
                retArr.push(obj);
            })
            setSongList([...retArr]);
        })
    }
    return <Fragment>
        <AlbumuSelection songList={songList} isAblumu={true}></AlbumuSelection>
    </Fragment>
}
export default DigitalAlbum;