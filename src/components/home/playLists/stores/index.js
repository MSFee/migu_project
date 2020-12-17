import React, { createContext, useContext, useState, useEffect } from "react";
import service from "../../../../http";

import useStore from "./useStore";
const Store = createContext();

export function usePlayListsStore() {
  return useContext(Store);
}

export const StoreProvider = (props) => {
  const { children } = props;

  const mainStore = useStore();

  const value = {
    ...props,
    prefixCls: "weng-play",
    mainStore,
  };
  return <Store.Provider value={value}>{children}</Store.Provider>;
};
