import { observable, computed, action, runInAction } from 'mobx';

export default class Chanels {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable items = [
    {
      id: 'VK',
      lastMessageId: null
    },
    {
      id: 'OK',
      lastMessageId: null
    },
    {
      id: 'FB',
      lastMessageId: null
    }
  ];

  @computed get channelIds(){
    return this.items.map(field => field.id);
  }

  @action update = (message) => {
    let item = this.getById(message.channelId);
    item.lastMessageId = message.id;
  }

  @computed get getById() {
    return function(id){
       let ind = this.items.findIndex(el => el.id === id);
       return ind in this.items ? this.items[ind] : null;
    }
  }

  @computed get getSorted(){
    let items = this.items.map(item => {
      let message = null;

      if (item.lastMessageId !== null) {
        message = Object.assign({},this.rootStore.messages.getById(item.lastMessageId));

        if (message.body.length >= 25)
          message.body = message.body.substr(0, 25) + '...';

      }

      return {
        id: item.id,
        message: message
      };

    })

    return items.sort(function(a,b){
      var aTime = a.message === null ? 0 : new Date(a.message.ts).getTime();
      var bTime = b.message === null ? 0 : new Date(b.message.ts).getTime();

      return (bTime - aTime);
    })

  }
}
