import React, { createContext, useContext, useState, useEffect } from "react";
import service from "../../../../http";

import useStore from './useStore';
const Store = createContext();

export function usePlayListsStore() {
  return useContext(Store);
}

export const StoreProvider = (props) => {
  const { children } = props;
  const [mainData, setMainData] = useState([]);
  useEffect(() => {
      getBannerList();
  }, [])

  function getBannerList() {
    service({
      url: 'banner',
      methods: 'get',
    }).then(res => {
      const temArr = [];
      let index = 1;
      res.map(item => {
        const obj = {
          value: item.imageUrl,
          id: index++,
        }
        temArr.push(obj);
      })
      setMainData([...temArr])
    })
  }
  const mainStore = useStore();


  const value = {
    ...props,
    prefixCls: "weng-play",
    mainStore,
    mainData,
  };
  return <Store.Provider value={value}>{children}</Store.Provider>;
};
