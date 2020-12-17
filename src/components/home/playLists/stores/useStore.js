import { useLocalStore } from "mobx-react-lite";

import service from "../../../../http";


export default function useStore() {
  return useLocalStore(() => ({
    currentKey: "",
    setCurrentKey(value) {
      this.currentKey = value;
    },
    get getCurrentKey(){
      return this.currentKey
    },

    currentIndex: 0,
    setCurrentIndex(value) {
      this.currentIndex = value;
    },

    mainData:[],
    setMainData(value){
      this.mainData = [...value];
    },
    get getMainData(){
      return this.mainData.slice();
    },

    async getBannerList() {
      try {
        const res = await service({
          url: "banner",
          methods: "get",
        })
        if(res){
          const temArr = res.map((item, index) => {
            const obj = {
              value: item.imageUrl,
              id: index++,
            };
            return obj;
          });
          this.setCurrentKey(temArr[0]?.id);
          this.setMainData([...temArr]);
        }
      } catch (error) {
        throw new Error(error)
      }
    }
  }));
}
