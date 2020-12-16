import React, { Fragment, useState, useEffect }  from 'react'
import AlbumuSelection from '../../../common/albumuSelection';
import service from '../../../http';

const SingerList: React.FC<{}> = () =>{
    const [singerList, setSingerList] = useState<any[]>([]);
    const getSingerList = () => {
        service.get('/top/artists?offset=0&limit=5').then((res: any) => {
            let singerArr: any = [];
            res.map((item: { name: any; picUrl: any; }) => {
                const obj = {
                    imgUrl: item.picUrl, // 图片url
                    singName: item.name, // 歌手名称
                }
                singerArr.push(obj);
            })

            setSingerList([...singerArr]);
        })
    }
    useEffect(() => {
        getSingerList();
    }, [])
    return <Fragment>
        <AlbumuSelection songList={singerList} noFlag={true}></AlbumuSelection>
    </Fragment>
}
export default SingerList;