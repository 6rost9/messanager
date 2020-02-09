import React from 'react';
import withStore from '../hoks/withStore';

class ChanelSelect extends React.Component {
  render() {
    let chanelsStore = this.props.stores.chanels;
    let messagesStore = this.props.stores.messages;
    let chanel = chanelsStore.getSorted.map((el, i)=>{
      return  <div className="chanel-item" key={`${i}`} onClick={() => messagesStore.setChanel(el.id)}>
                <div className="chanel-item__heading">
                  <div className="chanel-item__name">
                    { el.message !== null && (<>
                      {el.message.roomId}
                    </>)}
                  </div>
                  <div className="chanel-item__chanel">
                    {el.id}
                  </div>
                </div>
                <div className="chanel-item__message">
                  { el.message !== null && (
                    <>{el.message.body}</>)}
                </div>
              </div>
    })

    return  <div className="chanels">
              {chanel}
            </div>
  }
}

export default withStore(ChanelSelect);
