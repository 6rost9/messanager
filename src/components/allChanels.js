import React from 'react';
import withStore from '../hoks/withStore';

class ChanelSelect extends React.Component {


  render(){
    let messagesStore = this.props.stores.messages;
    var lastChannel = '';
    let messagesListSeparated = messagesStore.items.map((message) => {
      let classNames = 'message-item'
          classNames += message.roomId === messagesStore.author.name ? ' message-item__self' : '';
      let item = <>
        { lastChannel !== message.channelId && (
          <div className="message-separator" key={`${message.roomId} + ${message.ts}`}>
            <div className="message-separator__label">
              {message.channelId}
            </div>
          </div>
        )}
        <div className={`${classNames}`} key={`${message.roomId} + ${message.channelId} + ${message.ts}`}>
          <div className="message-item__wrap">
            {message.body}
          </div>
        </div>
      </>;

      lastChannel = message.channelId
      return item;
    });

    return  <>
              <div className="chat-item__heading">
                <span>{messagesStore.author.name}</span>
                <span>All Channels</span>
              </div>
              <div className="messages">
                {messagesListSeparated}
              </div>
            </>

  }
}

export default withStore(ChanelSelect);
