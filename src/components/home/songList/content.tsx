import React from 'react'
import ShuffFigure from './shuffFigure';
import { observer } from "mobx-react-lite";
import Detail from './delail/index';
import './index.less'

const SongList: React.FC<{}> =() => {
    return <div className="song_list">
        <div className="song_list_left">
        <ShuffFigure></ShuffFigure>
        </div>
        <div className="song_list_right">
            <Detail></Detail>
        </div>
    </div>
}
export default observer(SongList);