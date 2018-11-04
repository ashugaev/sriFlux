const Dispatcher = (function() {
  function Dispatcher() {
    this.callbacks = {};
    this.isDispatching = false;
    this.isPending = {};
    this.lastID = 1;
    this.isHandled = {};
  }

  // Записали наш callback, которые сработает при dispatch
  Dispatcher.prototype.register = function(callback) {
    const id = `ID_${this.lastID++}`;
    this.callbacks[id] = callback;
    return id;
  };

  // Убирает из объекта информацию по экшену
  Dispatcher.prototype.unregister = function() {
    delete this._callbacks[id];
  };

  // Вызываем для мутации стейта
  Dispatcher.prototype.dispatch = function(payload) {
    this.startDispatching(payload);
    try {
      // Проходимся по id каллбеков и вызываем их
      for (let id in this.callbacks) {
        if (this.isPending[id]) {
          continue;
        }
        this.invokeCallback(id);
      }
    } finally {
      this.stopDispatching();
    }
  };

  Dispatcher.prototype.isDispatching = function() {
    return this.isDispatching;
  };

  // Вызывается callback
  Dispatcher.prototype.invokeCallback = function(id) {
    // В ожидании
    this.isPending[id] = true;
    // Вызывается callback с this.pendingPayload
    this.callbacks[id](this.pendingPayload);
    this.isHandled[id] = true;
  };

  // Переводит все экшены в статуы ожидания, записывает callbacks и включет режим диспатчинга
  Dispatcher.prototype.startDispatching = function(payload) {
    for (let id in this.callbacks) {
      this.isPending[id] = false;
      this.isHandled[id] = false;
    }
    this.pendingPayload = payload;
    this.isDispatching = true;
  };

  // После вызова всех келлбеков удаляет данные экшена и выключает режим диспатчинга
  Dispatcher.prototype.stopDispatching = function() {
    delete this.pendingPayload;
    this.isDispatching = false;
  };

  return Dispatcher;
})();

export default Dispatcher;
