import { observable, computed, action, runInAction } from 'mobx';
const loremIpsum = require('lorem-ipsum').loremIpsum;

let init = true;
const roomIds = ['Rick Sanchez', 'Morty Smith', 'Dipper Pines', 'Mabel Pines', 'Spongebob Squarepants'];

export default class Messages {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.emit();
  }

  @observable items = [];
  @observable author = {
    name: 'Rick Sanchez',
    chanel: null
  };

  @action add = (message) => {
    this.items.push(message);
    this.rootStore.chanels.update(message);
  }

  @action setChanel = (chanel) => {
    this.author.chanel = chanel;
  }

  @computed get getById() {
    return function(id){
      let ind = this.items.findIndex(el => el.id === id);
      return ind in this.items ? this.items[ind] : null;
    }
  }

  @computed get getByRoom() {
    return function(roomId){
      return this.items.filter(function(el) {
        return el.channelId === roomId;
      });
    }
  }

  @computed get getLastItemId() {
    if (this.items.length === 0)
     return 0;
    else
     return this.items[this.items.length - 1].id;
  }

  getIndexById(id) {
    return this.products.findIndex(pr => pr.id === id);
  }


  emit = () => {
      let lastItemId = this.getLastItemId;
      if (init) {
          init = false;
      } else {
          this.handle({
              id: ++lastItemId,
              roomId: this.randomChoose(roomIds),
              channelId: this.randomChoose(this.rootStore.chanels.channelIds),
              body: loremIpsum({
                  count: this.randomBetween(1, 5),
                  format: 'plain',
                  units: this.randomChoose(['sentences', 'words']),
              }),
              ts: new Date(),
          });
      }
      setTimeout(this.emit, this.randomBetween(3000, 5000));
  }

  randomBetween = (min, max) => {
      return Math.floor((max - min + 1) * Math.random()) + min;
  }

  randomChoose = (array) => {
    return array[this.randomBetween(0, array.length - 1)];
  }

  handle = (message) => {
    this.add(message);
  }

}
