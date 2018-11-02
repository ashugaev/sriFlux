import {
    addItemAction
} from './store/actions.js'
import {
    ListStore
} from './store/storage.js'

console.log('Создаем')

// Store


export function listChanged() {
    console.log('Изменилось')
}

// Dispatcher
document.querySelector('button').addEventListener('click', (event) => {
    console.log('Создаем')
    addItemAction()
    event.target.textContent = ListStore.getAll().length
    console.log('ListStore', ListStore.getAll())
})



// let Store = {
//     items: [],

//     getAll: () => this.items
// }