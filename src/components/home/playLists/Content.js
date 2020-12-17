import { map } from "lodash";
import React, { useEffect } from "react";

import { usePlayListsStore } from "./stores";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import Pane from "./components/pane";

import "./index.less";

let timer;

const PlayLists = () => {
  const { prefixCls, mainStore } = usePlayListsStore();

  const {
    setCurrentKey,
    setCurrentIndex,
    currentIndex,
    getBannerList,
    getMainData,
  } = mainStore;

  useEffect(() => {
    getBannerList();
  }, []);

  const handleChange = (id, index) => {
    setCurrentKey(id);
    setCurrentIndex(index);
  };

  useEffect(() => {
    let i = 1;
    if (getMainData.length) {
      timer = setInterval(() => {
        if (i > getMainData.length - 1) i = 0;
        setCurrentKey(getMainData[i]?.id);
        setCurrentIndex(i++);
      }, [2000]);
    }
  }, [getMainData]);

  const renderShadowleft = () => {
    if (currentIndex === 0) return null;
    return currentIndex * 22;
  };

  const handleMouseEnter = () => {
    if (timer) {
      clearInterval(timer);
    }
  };

  const handleMouseLeave = () => {
    let i = currentIndex;
    timer = setInterval(() => {
      if (i > getMainData.length - 1) i = 0;
      setCurrentKey(getMainData[i].id);
      setCurrentIndex(i++);
    }, [2000]);
  };

  const renderFooter = () => (
    <div className={`${prefixCls}-footer`}>
      {map(getMainData, ({ id }, index) => (
        <span
          onClick={() => handleChange(id, index)}
          key={index}
          className={`${prefixCls}-footer-item`}
        />
      ))}
      <span
        className={`${prefixCls}-footer-shadow`}
        style={{
          left: renderShadowleft() || 0,
        }}
      />
    </div>
  );

  const renderItemLeft = (index) => {
    if (index < currentIndex) {
      return `${(index - currentIndex + 1) * 50}%`;
    }
    if (index === currentIndex) {
      return "6%";
    }
    return `${(index - currentIndex) * 50}%`;
  };

  const renderLists = () => {
    const tempArr = [];
    const mainComponents = (
      <>
        {map(getMainData, (item, index) => (
          <Pane
            {...item}
            index={index}
            key={item?.id}
            left={renderItemLeft(index)}
            handleChange={handleChange}
          />
        ))}
      </>
    );
    const endIndex = getMainData.length - 1;

    const head = (
      <Pane
        {...getMainData[endIndex]}
        index={endIndex}
        key={getMainData[endIndex]?.id}
        left="0"
        handleChange={handleChange}
      />
    );
    const end = (
      <Pane
        {...getMainData[0]}
        index={0}
        key={getMainData[0]?.id}
        left="50%"
        handleChange={handleChange}
      />
    );
    tempArr.push(mainComponents);
    currentIndex === endIndex && tempArr.push(end);
    currentIndex === 0 && tempArr.unshift(head);

    return <div className={`${prefixCls}-lists`}>{tempArr}</div>;
  };

  useEffect(
    () =>
      function () {
        if (timer) clearInterval(timer);
      },
    []
  );

  return (
    <div
      className={`${prefixCls}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`${prefixCls}-main`}>{renderLists()}</div>

      {renderFooter()}

      <div className={`${prefixCls}-btnGroups`}>
        <div
          className={`${prefixCls}-btnGroups-left`}
          onClick={() => {
            let tempIndex;
            if (currentIndex === 0) {
              tempIndex = getMainData.length - 1;
            } else {
              tempIndex = currentIndex - 1;
            }
            handleChange(getMainData[tempIndex].id, tempIndex);
          }}
        >
          <LeftOutlined />
        </div>
        <div
          className={`${prefixCls}-btnGroups-right`}
          onClick={() => {
            let tempIndex;
            if (currentIndex === getMainData.length - 1) {
              tempIndex = 0;
            } else {
              tempIndex = currentIndex + 1;
            }
            handleChange(getMainData[tempIndex].id, tempIndex);
          }}
        >
          <RightOutlined />
        </div>
      </div>
    </div>
  );
};

export default observer(PlayLists);
