import React from 'react'
import Content from './content';
import { StoreProvider } from './store/index'

export default (props: any) => (
    <StoreProvider {...props}>
      <Content />
    </StoreProvider>
  );