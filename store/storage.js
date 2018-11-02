import MicroEvent from '../microevents.js'

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

MicroEvent.mixin(ListStore)

// Подпишемся на событие change
ListStore.bind('change', listChanged);