import React, { useEffect } from 'react';
import axios from 'axios';
import './index.less';
import TitleMore from '../titleMore/index';
import WengPlay from './playLists';
import LaylistRecom from './laylistRecom/index';
import NewCourier from './newCourier/index';
import NewDiscShelve from './newDiscShelve';
import DigitalAlbum from './digitalAlbum';
import SongList from './songList';
import BodyBottom from './bodyBottom/index';

function IndexHome() {
    return (<div className="migu_main_body">
         <div className="shuffing">
            <WengPlay></WengPlay>
        </div>
        <div className="song_catage">
            <img src="https://cdnmusic.migu.cn/tycms_picture/20/06/169/200617144848198_396x160_1430.png"></img>
            <img src="https://cdnmusic.migu.cn/tycms_picture/20/06/169/200617144824970_396x160_7614.png"></img>
            <img src="https://cdnmusic.migu.cn/tycms_picture/20/06/169/200617144759295_396x160_2765.png"></img>
            <img src="https://cdnmusic.migu.cn/tycms_picture/20/06/169/200617144901907_396x160_8302.png"></img>
        </div>

        <TitleMore title="歌单推荐"></TitleMore>
        <LaylistRecom></LaylistRecom>
        <NewCourier></NewCourier>
        <TitleMore title="新碟上架"></TitleMore>
        <NewDiscShelve></NewDiscShelve>

        <TitleMore title="数字专辑"></TitleMore>
        <DigitalAlbum></DigitalAlbum> 

        <BodyBottom></BodyBottom>
        <TitleMore title="排行榜"></TitleMore>
        <SongList></SongList>


    </div>)
}
export default IndexHome;