import Dispatcher from '../MyDispatcher.js';
import {
    ListStore
} from './storage.js'

// Создает из ф-ции объект
const AppDispatcher = new Dispatcher;

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
            console.log('register callback')
            ListStore.items.push(payload.newItem);
            ListStore.trigger('change');
            break
    }

    return true
})