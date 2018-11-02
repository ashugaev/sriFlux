import Dispatcher from './Dispatcher.js';
import MicroEvent from './microevents.js'

let AppDispatcher = new Dispatcher;

console.log('Создаем')

// Store
let ListStore = {
    items: [],
    getAll: () => {
        return this.items;
    }
}

MicroEvent.mixin(ListStore)

// Подпишемся на событие change
ListStore.bind('change', listChanged);

function listChanged() {
    console.log('Изменилось')
}

// Dispatcher
document.querySelector('button').addEventListener('click', (event) => {
    console.log('Создаем')
    AppDispatcher.dispatch({
        eventName: 'new-item',
        newItem: {
            name: 'Mango'
        }
    })

    console.log('ListStore', ListStore)
})


AppDispatcher.register((payload) => {
    switch (payload.eventName) {
        case 'new-item':
            ListStore.items.push(payload.newItem);
            ListStore.trigger('change');
            break
    }

    return true
})
// let Store = {
//     items: [],

//     getAll: () => this.items
// }