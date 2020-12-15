import React, { createContext, useContext } from 'react'
import useStore from './useStore';
const Store = createContext(null);

export function ImgListStore() {
    useContext(Store);
}

export const  StoreProvider = (props: any) => {
    const { children } = props;
    const mainStore = useStore();
    const value = {
        ...props,
        mainStore,
    }
    return <Store.Provider value={value}>{children}</Store.Provider>
}