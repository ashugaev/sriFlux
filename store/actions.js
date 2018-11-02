import Dispatcher from '../Dispatcher.js';
import {
    ListStore
} from './storage.js'

let AppDispatcher = new Dispatcher;

export function addItemAction(i) {
    AppDispatcher.dispatch({
        eventName: 'new-item',
        newItem: {
            name: 'Mango'
        }
    })
}

AppDispatcher.register((payload) => {
    switch (payload.eventName) {
        case 'new-item':
            ListStore.items.push(payload.newItem);
            ListStore.trigger('change');
            break
    }

    return true
})