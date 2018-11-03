import AppDispatcher from '../MyDispatcher.js';
import {
    ListStore
} from './storage.js'

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