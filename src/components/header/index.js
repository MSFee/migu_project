import React, { useEffect, useState } from 'react';
import { Router, Route, Link } from 'react-router-dom';
import { Input } from 'antd';
import {
    SearchOutlined,
    UserOutlined,
} from '@ant-design/icons';
import './index.less'
function Header() {
    const [isShowSearch, setIsShowSearch] = useState(true);
    const [mouseEnter, setMouseEnter] = useState(false);
    useEffect(() => {
        screenWidth();
        window.addEventListener('resize', screenWidth)
    }, []);
    function screenWidth() {
        const width = document.documentElement.clientWidth;
        if (width < 1200) {
            setIsShowSearch(false);
        } else {
            setIsShowSearch(true);
        }
    }
    function handleMounseEnter() {
        setMouseEnter(true)
    }
    function handleMounseLeave() {
        setMouseEnter(false)
    }
    return <div className="migu_header">
        <div className="migu_header_top">
            <div className="migu_header_logo">
                <img src="https://cdnmusic.migu.cn/tycms_picture/20/10/294/201020171104983_90x26_2640.png"></img>
            </div>
            <div className="migu_header_options">
                <li>发现</li>
                <li>音乐</li>
                <li>朋友</li>
                <li>凡响计划</li>
                <li>客户端下载</li>
            </div>
            <div className="migu_header_search" style={{ minWidth: isShowSearch ? '250px' : '60px' }}>
                <div className="search_body" onMouseLeave={handleMounseLeave}>
                    <div
                        onMouseEnter={handleMounseEnter}
                        className="search_icon">
                        <SearchOutlined />
                    </div>
                    <div className="search_content" style={{ width: isShowSearch || mouseEnter ? '250px' : '0' }}>
                        <Input placeholder="搜索歌曲、歌手、MV"></Input>
                    </div>
                </div>
            </div>
            <div className="migu_header_login">
                <UserOutlined />
            </div>
        </div>
        <footer className="migu_header_footer">
            <div className="migu_header_logo">
            </div>
            <div className="migu_header_options">
                <li>
                    <Link to="/home">首页</Link>
                </li>
                <li>
                    <Link to="/playlist">歌单</Link>
                </li>
                <li>专辑</li>
                <li>榜单</li>
                <li>
                    <Link to="/singer">歌手</Link>
                </li>
            </div>
        </footer>
    </div>
}
export default Header;