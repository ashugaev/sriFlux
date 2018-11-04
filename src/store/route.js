import Dispatcher from '../../ShriFlux/MyDispatcher';

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
            console.log('Дошло до стора', payload.route);
            routeState.route = payload.route;

            console.log('Наш новы стейт', routeState.getRoute())

            break
    }

    return true
})