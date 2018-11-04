// Через эмиттер можно вызвать несколько келлбеков по названию (eventName)

const EventEmitter = (function () {
    function EventEmitter() {}

    // Пишем наше событие в объект events
    EventEmitter.prototype.bind = function (eventName, func) {
        // Если нет объекта - создать его
        this.events = this.events || {};
        // Если евента нет создать внутри массив
        this.events[eventName] = this.events[eventName] || [];
        // Пишем ф-ция в евенты
        this.events[eventName].push(func)
    }

    // Убираем событие из объекта
    EventEmitter.prototype.unbind = function (eventName, func) {
        this.events = this.events || {}
        if (eventName in this.events === false) return;
        this.events[eventName].splice(this.events[eventName].indexOf(func), 1)
    }

    // Вызваем келлбеки
    EventEmitter.prototype.trigger = function (eventName /* , args... */ ) {
        this.events = this.events || {}
        if (eventName in this.events === false) return
        for (let i = 0; i < this.events[eventName].length; i++) {
            this.events[eventName][i].apply(this, Array.prototype.slice.call(arguments, 1))
        }
    }

    // Пишет в объект вышеописанные методы
    EventEmitter.mixin = function (destObject) {
        const props = ['bind', 'unbind', 'trigger'];
        for (let i = 0; i < props.length; i++) {
            if (typeof destObject === 'function') {
                destObject.prototype[props[i]] = EventEmitter.prototype[props[i]];
            } else {
                destObject[props[i]] = EventEmitter.prototype[props[i]]
            }
        }
        return destObject
    }

    return EventEmitter;
})();

export default EventEmitter;