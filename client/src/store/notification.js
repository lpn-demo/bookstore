import {observable, computed, action} from 'mobx';

class Notification{
    @observable notifications = {};
    _ai = 0;

    @computed get list(){
        return Object.values(this.notifications);
    }

    @action add(message, type = 'danger', timeToAutoHide = 3000){
        this.notifications[++this._ai] = {
            id: this._ai,
            message,
            type
        };
        
        if(timeToAutoHide !== null){
            let carringId = this._ai;

            setTimeout(() => {
                this.remove(carringId);
            }, timeToAutoHide);
        }
    }

    @action remove(id){
        if(id in this.notifications){
            delete this.notifications[id];
        }
    }
}

export default new Notification();