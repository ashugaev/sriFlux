import Dispatcher from '../../ShriFlux/MyDispatcher';
import EventEmitter from '../../ShriFlux/EventEmitter';


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
    console.log(window.location.host + routeState.getRoute())
    document.location.href =  routeState.getRoute();
}

EventEmitter.mixin(routeState);
routeState.bind('CHANGE_ROUTE', routeChanged);
