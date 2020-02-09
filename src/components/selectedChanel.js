import React from 'react';
import { TextField, IconButton } from '@material-ui/core';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import withStore from '../hoks/withStore';

class ChanelSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    if (this.el !== undefined)
      this.el.scrollIntoView({ behavior: 'smooth' });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let messagesStore = this.props.stores.messages;
    let lastItemId = messagesStore.getLastItemId;

    if (this.state.value === '') return;

    messagesStore.add({
      id: ++lastItemId,
      roomId: messagesStore.author.name,
      channelId: messagesStore.author.chanel,
      body: this.state.value,
      ts: new Date()
    })
    this.setState({value: ''});

  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  render(){
    let messagesStore = this.props.stores.messages;

    let messages = messagesStore.getByRoom(messagesStore.author.chanel).map(message => {
      let classNames = 'message-item'
          classNames += message.roomId === messagesStore.author.name ? ' message-item__self' : '';
      return  <div className={`${classNames}`} key={`selectedChanel ${message.ts}`}>
                <div className="message-item__wrap">
                  {message.body}
                </div>
              </div>
    })


    if (messagesStore.author.chanel === null) {
      return  <div className="notice">
                <span>Select chanel</span>
              </div>
    } else  {
      return  <>
                <div className="chat-item__heading">
                  <div className="chat-item__room">
                    {messagesStore.author.name}
                  </div>
                  <div className="chat-item__chanel">
                    {messagesStore.author.chanel}
                  </div>
                </div>
                <div className="messages">
                  {messagesStore.author.chanel !== null && (
                    <>{messages}</>
                  )}
                  <div ref={el => { this.el = el; }} />
                </div>
                <div className="send-form__wrap">
                  <form className="send-form" onSubmit={this.handleSubmit} noValidate autoComplete="off">
                    <TextField onChange={this.handleChange} value={this.state.value} required id="standard-required" placeholder="Сообщение..." />
                    <IconButton type="submit" aria-label="delete">
                      <UpIcon />
                    </IconButton>
                  </form>
                </div>
              </>
    }
  }
}

export default withStore(ChanelSelect);
