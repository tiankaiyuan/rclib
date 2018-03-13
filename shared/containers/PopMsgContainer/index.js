/**
 * Created by tiankaiyuan on 2018/3/8.
 */
import React from 'react';
import {connect} from 'react-redux'
import PopMsg    from '../../components/PopMsg';
import {
    popHidden,
    popConfirm
}       from '../../stateChanger/actions'
const PopMsgContainer = ({popMsgs, popHidden, popConfirm}) => {
    let popMsgList = [], defaultItem = popMsgs.defaultItem;
    for (let i in defaultItem) {
        if (defaultItem.hasOwnProperty(i)) {
            let item = defaultItem[i].data || popMsgs.defaultMsg;
            popMsgList.push(<PopMsg msg={item.popMsg}
                                    key={i}
                                    id={i}
                                    needConfirm={item.needConfirm}
                                    onPopHidden={popHidden}
                                    style={{top: (5 + defaultItem[i].index * 12) + '%'}}
                                    onConfirm={popConfirm}
                                    showTime={item.showTime}/>);
        }
    }

    return popMsgList
};

const PopMsgContainerMSTP = state => {
    return {
        popMsgs: state.popMsgs
    }
};
const PopMsgContainerMDTP = dispatch => {
  return {
      popHidden: (index) => {
          dispatch(popHidden(index))
      },
      popConfirm: (index) => {
          dispatch(popConfirm(index))
      },
  }
};
export default connect(PopMsgContainerMSTP,PopMsgContainerMDTP)(PopMsgContainer);
