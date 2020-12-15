// 首页轮播图
import React, { useState, useEffect } from 'react';
import { RightOutlined, LeftOutlined } from '@ant-design/icons'
import './index.less'
let timer = null;
let optionFlag;
const temArr = [
    {

        value: 'https://cdnmusic.migu.cn/tycms_picture/20/02/36/20020512065402_360x360_2997.png',
        key: 1,
    }, {
        value: 'https://cdnmusic.migu.cn/tycms_picture/20/04/99/200408163702795_360x360_1614.png',
        key: 2,
    }, {
        value: 'https://cdnmusic.migu.cn/tycms_picture/20/04/99/200408163702795_360x360_1614.png',
        key: 3,

    }
];

temArr.unshift({
    value: temArr[temArr.length - 1].value,
    key: 0
})
temArr.push({
    value: temArr[1].value,
    key: temArr.length,
})
temArr.push({
    value: temArr[2].value,
    key: temArr.length,
})

const optionsArr = [1, 2, 3];
const trueImageNum = 3; // 真实的图片数量
const gapDistance = 140; // 左右的间隙距离

let temnode = 1;
function ShuffFiure() {
    const [imageWidth, setImageWidthValue] = useState(0)
    const [distanceLeft, setDistanceLeft] = useState(0);
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
        } else {
            changeNext();
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
                        temArr.map(item => {
                            return (
                                <li className={[
                                    currentNode === item.key ? "active" : null,
                                    "shuff_figure_pic",
                                ].join(" ")}

                                    key={item.key}
                                    style={{ backgroundImage: `url('${item.value}')`, width: imageWidth }}
                                >
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
export default ShuffFiure;