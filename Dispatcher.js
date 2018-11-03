'use strict';
import invariant from './invariant.js';

var _prefix = 'ID_';

var Dispatcher = (function () {
    function Dispatcher() {
        this._callbacks = {};
        this._isDispatching = false;
        this._isHandled = {};
        this._isPending = {};
        this._lastID = 1;
    }
    /**
     * Registers a callback to be invoked with every dispatched payload. Returns
     * a token that can be used with `waitFor()`.
     */
    Dispatcher.prototype.register = function (callback) {
        var id = _prefix + this._lastID++;
        this._callbacks[id] = callback;
        return id;
    };
    /**
     * Removes a callback based on its token.
     */
    Dispatcher.prototype.unregister = function (id) {
        invariant(this._callbacks[id], 'Dispatcher.unregister(...): `%s` does not map to a registered callback.', id);
        delete this._callbacks[id];
    };
    /**
     * Waits for the callbacks specified to be invoked before continuing execution
     * of the current callback. This method should only be used by a callback in
     * response to a dispatched payload.
     */
    Dispatcher.prototype.waitFor = function (ids) {
        invariant(this._isDispatching, 'Dispatcher.waitFor(...): Must be invoked while dispatching.');
        for (var ii = 0; ii < ids.length; ii++) {
            var id = ids[ii];
            if (this._isPending[id]) {
                invariant(this._isHandled[id], 'Dispatcher.waitFor(...): Circular dependency detected while ' +
                    'waiting for `%s`.', id);
                continue;
            }
            invariant(this._callbacks[id], 'Dispatcher.waitFor(...): `%s` does not map to a registered callback.', id);
            this._invokeCallback(id);
        }
    };
    /**
     * Dispatches a payload to all registered callbacks.
     */
    Dispatcher.prototype.dispatch = function (payload) {
        invariant(!this._isDispatching, 'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.');
        this._startDispatching(payload);
        try {
            for (var id in this._callbacks) {
                if (this._isPending[id]) {
                    continue;
                }
                this._invokeCallback(id);
            }
        } finally {
            this._stopDispatching();
        }
    };
    /**
     * Is this Dispatcher currently dispatching.
     */
    Dispatcher.prototype.isDispatching = function () {
        return this._isDispatching;
    };
    /**
     * Call the callback stored with the given id. Also do some internal
     * bookkeeping.
     *
     * @internal
     */
    Dispatcher.prototype._invokeCallback = function (id) {
        this._isPending[id] = true;
        this._callbacks[id](this._pendingPayload);
        this._isHandled[id] = true;
    };
    /**
     * Set up bookkeeping needed when dispatching.
     *
     * @internal
     */
    Dispatcher.prototype._startDispatching = function (payload) {
        for (var id in this._callbacks) {
            this._isPending[id] = false;
            this._isHandled[id] = false;
        }
        this._pendingPayload = payload;
        this._isDispatching = true;
    };

    Dispatcher.prototype._stopDispatching = function () {
        delete this._pendingPayload;
        this._isDispatching = false;
    };
    return Dispatcher;
}());

// export default Dispatcher;
let AppDispatcher = new Dispatcher;
export default AppDispatcher;