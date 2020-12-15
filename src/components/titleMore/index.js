import { RightCircleFilled } from '@ant-design/icons'
import React from 'react'
import './index.less'

function TitleMore(props) {
    const { title } = props;
    return <div className="title_more">
        <div className="title_container">
        <span className="title">{title}</span>
            <span className="more">更多 <RightCircleFilled /></span>
        </div>
    </div>
}
export default TitleMore;