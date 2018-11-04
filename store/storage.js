import EventEmitter from '../EventEmitter.js'

import {
    listChanged
} from '../index.js'

console.log('appdis', listChanged)

export let ListStore = {
    items: [],
    getAll: function () {
        return this.items;
    }
}

// Пишет listStore в хранилище, что бы мутировать его из
EventEmitter.mixin(ListStore)

// При вызобе сhange выполним listChanged
ListStore.bind('change', listChanged);