import MessagesStore from './messages';
import ChanelsStore from './chanels';

class RootStore{
	constructor(){

		this.chanels = new ChanelsStore(this);
		this.messages = new MessagesStore(this);
	}
}

export default new RootStore();
