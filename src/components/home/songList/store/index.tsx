import React, { createContext, useContext, useState, useEffect } from 'react'
import useStore from './useStore';
import service from '../../../../http/index';

class ImageInfo{value: string | undefined; key!: number; imgUrl?: string}



// @ts-ignore
const Store = createContext();
let currentSongList: Array<any> = [];

export function ImgListStore() {
    return useContext(Store);
}

class SongInfo { key!: string | number; songname: any; picUrl: any; singer!: string; }
const temArr: Array<ImageInfo> = [
    {
        value: 'https://cdnmusic.migu.cn/tycms_picture/20/02/36/20020512065402_360x360_2997.png',
        key: 1,
    }, {
        value: 'https://cdnmusic.migu.cn/tycms_picture/20/04/99/200408163702795_360x360_1614.png',
        key: 2,
    }, {
        value: 'https://cdnmusic.migu.cn/tycms_picture/20/04/99/200408163640868_360x360_6587.png',
        key: 3,
    }
];
export const StoreProvider = (props: any) => {
    const [songList, setSongList] = useState<SongInfo[]>();
    const [threeImageList, setThreeTmageList] = useState<ImageInfo[]>();

    const currentInital = (): Array<ImageInfo> => {
        temArr.unshift({
            value: temArr[temArr.length - 1].value,
            key: 0,
            imgUrl: temArr[temArr.length - 1].imgUrl,
        })
        temArr.push({
            value: temArr[1].value,
            key: temArr.length,
            imgUrl: temArr[1].imgUrl,
        })
        temArr.push({
            value: temArr[2].value,
            key: temArr.length,
            imgUrl: temArr[2].imgUrl,
        })
        return temArr;
    }
    const getSongList = (id: number): void => {
        service.get(`/playlist/detail?id=${id}`).then((res: any) => {
            currentSongList = res.tracks.slice(0, 90);
            checkSongList();
            const currentArr = [];
            temArr[0].imgUrl = currentSongList[1].al.picUrl;
            temArr[1].imgUrl = currentSongList[31].al.picUrl;
            temArr[2].imgUrl = currentSongList[61].al.picUrl;
            const ret = currentInital();
            setThreeTmageList([...ret]);
        })
    }
    const checkSongList = (initial: number = 1): void => {
        const temArr: Array<any> = currentSongList.slice((initial - 1) * 30, initial * 30);
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
    useEffect(() => {
        getSongList(3779629);
    }, [])
    const changeSongType = (type: number): void => {
        checkSongList(type)
    }
    const { children } = props;
    const mainStore = useStore();
    const value = {
        ...props,
        mainStore,
        songList,
        changeSongType,
        threeImageList
    }
    return <Store.Provider value={value}>{children}</Store.Provider>
}