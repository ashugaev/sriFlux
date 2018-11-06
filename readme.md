# Коментарии

- Фреймворк хранит стейты по Flux, записывает их из стора в cookie, а при запуске приложения пишет все cookie в стор и применяет их.

- Диспатчер похож на фейсбуковский

- Результат выглядит слишком громоздко, возоможно стоило сделать что-то более лаконичное и простое в работа

# Подключение:

1. Подразумевается, что будут два файла: один со стейтами, другой с экшенами. Но это не обязательно.
2. Изначально store мы подключаем и инициализируем диспатчер

```
import Dispatcher from '../../ShriFlux/MyDispatcher';

const AppDispatcher = new Dispatcher;
```

3. Создаем объект, который будет хранить сотояние и возвращать его

```
export let routeState = {
    route: '',
    getRoute: function () {
        return this.route;
    }
}
```

3. Регистрируем управляющую ф-цию, которая будет менять стейт

```
AppDispatcher.register((payload) => {
    switch (payload.eventName) {
        case 'CHANGE_ROUTE':
           ...
           ...
            break
    }
})
```

4. Создаем экшен, который будет инициализировать изменение стейта

```
    AppDispatcher.dispatch({
        eventName: 'CHANGE_ROUTE',
        route
    })
```

5. Теперь наши состояния записываются. Нужно подключить EventEmitter, которые будет сообщать приложению об изменениях

6. Инициализируем эммитер для нашей ф-ции с состояниями.
   Ф-ция routeChanged будет выполняться при вызове эмиттера с параметром 'CHANGE_ROUTE'

```
EventEmitter.mixin(routeState);
routeState.bind('CHANGE_ROUTE', routeChanged);
```

7. Добавляем при срабатывание эммитера запись куки

```
    createCookie('store', store);
```

8. А при загрузки её чтение и выполнение экшена для записи в стор

```
    const storage = getGookie('store')
    if (storage) {
        changeRoute(storage.route)
    }
```

## Готово!
