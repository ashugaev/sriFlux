import Dispatcher from '../../ShriFlux/MyDispatcher';
import EventEmitter from '../../ShriFlux/EventEmitter';
import {
    createCookie,
    getGookie
} from '../../ShriFlux/CookieHandler';

export const AppDispatcher = new Dispatcher;


export let routeState = {
    route: '',
    getRoute: function () {
        return this.route;
    }
}

AppDispatcher.register((payload) => {
    switch (payload.eventName) {
        case 'CHANGE_ROUTE':
            routeState.route = payload.route;
            routeState.trigger('CHANGE_ROUTE')

            break
    }

    return true
})

function routeChanged() {
    let store = getGookie('store') || {}
    const route = routeState.getRoute();
    store.route = route;
    createCookie('store', store);
    document.location.href = route;
}

EventEmitter.mixin(routeState);
routeState.bind('CHANGE_ROUTE', routeChanged);