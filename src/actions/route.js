import {
    AppDispatcher
} from '../store/route'

export function changeRoute(route) {
    AppDispatcher.dispatch({
        eventName: 'CHANGE_ROUTE',
        route
    })
}