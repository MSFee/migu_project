// 首页轮播图
import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { RightOutlined, LeftOutlined, PlayCircleOutlined } from '@ant-design/icons'
import { ImgListStore } from '../store/index';
import './index.less'
let timer = null;
let optionFlag;
let indexType = 1;


const optionsArr = [1, 2, 3];
const trueImageNum = 3; // 真实的图片数量
const gapDistance = 140; // 左右的间隙距离

let temnode = 1;
function ShuffFiure() {
    const { changeSongType, threeImageList } = ImgListStore();
    const [imageWidth, setImageWidthValue] = useState(0)
    const [distanceLeft, setDistanceLeft] = useState(0);
    const [titleName, setTitleName] = useState("新歌");
    const [isShowMaskLeft, setShowMaskLeft] = useState(false);
    const [isShowMaskRight, setShowMaksRight] = useState(false);
    const [currentNode, setCurrentNode] = useState(1); // 默认选择第一张图片
    useEffect(() => {
        setImageWidth();
    }, []);

    function changeNext() {
        setCurrentNode(() => {
            temnode = currentNode === trueImageNum + 1 ? 2 : currentNode + 1;
            return temnode;
        })
        if (distanceLeft === gapDistance - (trueImageNum + 1) * imageWidth) {
            setDistanceLeft(gapDistance - imageWidth)
            animation(gapDistance - imageWidth, gapDistance - 2 * imageWidth, false);
        } else {
            animation(distanceLeft, distanceLeft - imageWidth, false)
        }
    }
    function changePre() {
        setCurrentNode(() => {
            temnode = currentNode === 1 ? trueImageNum : currentNode - 1;
            return temnode
        });
        if (distanceLeft === gapDistance - imageWidth) {
            setDistanceLeft(gapDistance - trueImageNum * imageWidth)
            animation(gapDistance - (trueImageNum + 1) * imageWidth, gapDistance - trueImageNum * imageWidth, true);
        } else {
            animation(distanceLeft, distanceLeft + imageWidth, true);
        }
    }
    function animation(currentDistance, targetDistance, isAdd) {
        let distance = currentDistance;
        distance = isAdd ? distance + imageWidth / 10 : distance - imageWidth / 10;
        setDistanceLeft(distance);
        if (isAdd && distance >= targetDistance || !isAdd && distance <= targetDistance) {
            cancelAnimationFrame(timer);
            setDistanceLeft(targetDistance)
        } else {
            timer = requestAnimationFrame(() => {
                animation(distance, targetDistance, isAdd)
            })
        }
    }
    function setImageWidth() {
        const temWidth = 170;
        setImageWidthValue(temWidth);
        setDistanceLeft(temnode === trueImageNum + 1 ? gapDistance - temnode * temWidth : (gapDistance - temWidth) - (temnode - 1) * temWidth);
    }
    function handleMouseEnter(flag) {
        if (flag === 'left') {
            setShowMaskLeft(true)
        } else {
            setShowMaksRight(true)
        }
    }
    function handleMouseLeave() {
        setShowMaksRight(false);
        setShowMaskLeft(false);
    }
    function handleClick(flag) {
        if (flag === 'left') {
            changePre();
            indexType = indexType === 1 ? indexType = 3 : --indexType;
            changeSongType(indexType);
        } else {
            changeNext();
            indexType = indexType === 3 ? indexType = 1 : ++indexType;
            changeSongType(indexType);
        }
        if(indexType === 1) {
            setTitleName("新歌");
        }else if(indexType === 3) {
            setTitleName("热歌");
        }else {
            setTitleName("原创")
        }
    }
    function changeImage(flag) {
        if (currentNode < flag) {
            const currentDistance = -(flag - 1) * imageWidth;
            const targetDistance = currentDistance - imageWidth + gapDistance;
            animation(currentDistance, targetDistance, false);
        } else {
            const currentDistance = - (flag + 1) * imageWidth;
            const targetDistance = currentDistance + imageWidth + gapDistance;
            animation(currentDistance, targetDistance, true);
        }
        setCurrentNode(flag);
    }
    return (
        <div className="shuff_figure">
            <div className="shuff_figure_main">
                <ul
                    className="shuff_figure_content"
                    style={{ left: `${distanceLeft}px` }}
                >
                    {
                        threeImageList?.map(item => {
                            return (
                                <li className={[
                                    currentNode === item.key ? "active" : null,
                                    "shuff_figure_pic",
                                ].join(" ")}

                                    key={item.key}
                                    style={{ backgroundImage: `url('${item.imgUrl}')`, width: imageWidth }}
                                >
                                    <img src={item.value}></img>
                                </li>
                            )
                        })
                    }
                </ul>
                <div
                    className="shuff_mask mask_left"
                    // style={{ opacity: !isShowMaskLeft ? '0' : '0.7' }}
                    onClick={() => handleClick('left')}
                    onMouseEnter={() => handleMouseEnter('left')}
                    onMouseLeave={handleMouseLeave}
                >
                    <LeftOutlined />
                </div>

                <div
                    className="shuff_mask mask_right"
                    // style={{ opacity: !isShowMaskRight ? '0' : '0.7' }}
                    onClick={() => handleClick('right')}
                    onMouseEnter={() => handleMouseEnter('right')}
                    onMouseLeave={handleMouseLeave}
                >
                    <RightOutlined />

                </div>
            </div>
            <div className="billboard ">
                <div className="slide_title">尖叫{titleName}榜</div>
                <div className="new_time">每小时更新</div>
                <div className="play_billboard">
                <PlayCircleOutlined />
                    <span>播放全部</span>
                </div>
            </div>
            {/* <div className="shuff_figure_options">
                {
                    currentNode === trueImageNum + 1 ? optionFlag = 1 : optionFlag = currentNode,
                    optionsArr.map(item => {
                        return <li
                            key={item}
                            style={{ backgroundColor: optionFlag === item ? 'red' : null }}
                            onClick={() => changeImage(item)}
                        ></li>
                    })
                }
            </div> */}
        </div>
    )
}
export default observer(ShuffFiure);