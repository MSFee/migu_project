import resolve from 'resolve';
import service from '../../../../http';

const getBannerList = () => {
    return new Promise((resolve, reject) => {
        service({
            url: 'banner',
            methods: 'get',
            type: 0
        }).then(res => {
             resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}

// getBannerList().then(res => {
//     console.log(res);
// })
const temArr = [
  {
      value: 'https://cdnmusic.migu.cn/tycms_picture/20/11/328/201123174408869_1400x350_3312.jpg',
      id: 1,
  }, {
      value: 'https://cdnmusic.migu.cn/tycms_picture/20/11/328/201123142739819_1400x350_729.jpg',
      id: 2,
  }, {
      value: 'https://cdnmusic.migu.cn/tycms_picture/20/11/330/201125101232971_1400x350_529.jpg',
      id: 3,
  }, {
      value: 'https://cdnmusic.migu.cn/tycms_picture/20/11/327/201122092610967_1400x350_1017.jpg',
      id: 4,
  }, {
      value: 'https://cdnmusic.migu.cn/tycms_picture/20/11/328/201123100402434_1400x350_6636.jpg',
      id: 5
  }, {
      value: 'https://cdnmusic.migu.cn/tycms_picture/20/11/329/201124093250408_1400x350_1577.jpg',
      id: 6
  }, {
      value: 'https://cdnmusic.migu.cn/tycms_picture/20/11/329/20112411122916_1400x350_8130.jpg',
      id: 7
  }, {
      value: 'https://cdnmusic.migu.cn/tycms_picture/20/03/79/200319225515423_1400x350_5570.jpg',
      id: 8
  }
];

export default temArr;