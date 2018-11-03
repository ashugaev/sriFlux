const Dispatcher = (function () {
    function Dispatcher() {
        this.callbacks = {};
        this.isDispatching = false;
        this.isPending = {};
        this.lastID = 1;
        this.isHandled = {};
    }

    Dispatcher.prototype.register = function (callback) {
        const id = `ID_${this.lastID++}`;
        this.callbacks[id] = callback;
        return id;
    }

    Dispatcher.prototype.unregister = function () {
        delete this._callbacks[id];
    }

    Dispatcher.prototype.waitFor = function (ids) {
        for (let i = 0; i < ids.length; i++) {
            let id = ids[i];
            // isPending задается в invokeCallback(при вызове каллбека)
            if (this.isPending[id]) {
                continue
            }
            // Если не вызван - вызваем
            this.invokeCallback(id)
        }
    }

    Dispatcher.prototype.dispatch = function (payload) {
        this.startDispatching(payload);
        try {
            // Проходимся по id каллбеков
            for (let id in this.callbacks) {
                if (this.isPending[id]) {
                    continue
                }
                this.invokeCallback(id)
            }
        } finally {
            this.stopDispatching()
        }
    }

    Dispatcher.prototype.isDispatching = function () {
        return this.isDispatching;
    }

    Dispatcher.prototype.invokeCallback = function (id) {
        // В ожидании
        this.isPending[id] = true
        // Вызывается callback с this.pendingPayload
        this.callbacks[id](this.pendingPayload)
        this.isHandled[id] = true;
    }

    Dispatcher.prototype.startDispatching = function (payload) {
        for (let id in this.callbacks) {
            this.isPending[id] = false;
            this.isHandled[id] = false;
        }
        this.pendingPayload = payload;
        this.isDispatching = true;
    }

    Dispatcher.prototype.stopDispatching = function () {
        delete this.pendingPayload;
        this.isDispatching = false;
    }

    return Dispatcher;
})()

// Создает из ф-ции объект
const AppDispather = new Dispatcher;

export default AppDispather;