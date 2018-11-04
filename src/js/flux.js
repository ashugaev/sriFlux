import {
    changeRoute
} from '../actions/route';

import {
    getGookie
} from '../../ShriFlux/CookieHandler';

document.querySelector('.header__menu-item:nth-child(5)').addEventListener('click', (event) => {
    event.preventDefault();
    changeRoute(event.target.getAttribute('href'))
})

window.addEventListener('load', () => {
    const storage = getGookie('store')
    if (storage) {
        changeRoute(storage.route)
    }
})
