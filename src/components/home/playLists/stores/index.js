import React, { createContext, useContext, useState, useEffect } from "react";
import service from "../../../../http";
import temArr from "./mappings";

import useStore from './useStore';
const Store = createContext();

export function usePlayListsStore() {
  return useContext(Store);
}

export const StoreProvider = (props) => {
  const { children } = props;
  const [mainData, setMainData] = useState(temArr);
  useEffect(() => {

  }, [])

  function getBannerList() {
    service({
      url: 'banner',
      methods: 'get',
      
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
