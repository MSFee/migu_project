import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { usePlayListsStore } from "../../stores";

const Pane = observer(({ value, index, id, left, handleChange }) => {
  const { prefixCls, mainStore } = usePlayListsStore();

  const { getCurrentKey } = mainStore;
  return (
    <div
      style={{
        backgroundImage: `url(${value})`,
        left,
      }}
      onClick={() => handleChange(id, index)}
      className={`${prefixCls}-lists-item ${
        id === getCurrentKey ? `${prefixCls}-lists-item-active` : ""
      }`}
    >
      <div className={`${prefixCls}-lists-item-shadow`} />
    </div>
  );
});

export default Pane;
