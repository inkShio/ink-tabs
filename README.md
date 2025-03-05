# InkTabs
Простая JavaScript-библиотека табов.
Посмотреть примеры можно [тут](https://inkshio.github.io/ink-tabs/).

## Установка
```shell
npm i ink-tabs --save
```

## Подключение
```js
import InkTabs from 'ink-tab';
```
```scss
// InkTabs
@use '/path/to/node_modules/ink-tabs/src/ink-tabs';
```
```js
const tabs = new InkTabs('.js-tabs');
```

```html
<div class="ink-tab js-tabs">
  <ul class="ink-tab__nav">
    <li class="ink-tab__item"><button class="ink-tab__button" type="button" data-tab-target="tab-one">Один</button></li>
    <li class="ink-tab__item"><button class="ink-tab__button" type="button">Два</button></li>
    <li class="ink-tab__item"><button class="ink-tab__button" type="button">Три</button></li>
    <li class="ink-tab__item"><button class="ink-tab__button" type="button" data-tab-load="fetch.html">Fetch Load</button></li>
    <li class="ink-tab__item"><button class="ink-tab__button" type="button" data-tab-link="https://www.google.com/">Google Link</button></li>
  </ul>
  <div class="ink-tab__content">
    <div class="ink-tab__panel">Контент Один</div>
    <div class="ink-tab__panel">Контент Два</div>
    <div class="ink-tab__panel">Контент Три</div>
    <div class="ink-tab__panel">fetch</div>
    <div class="ink-tab__panel">link</div>
  </div>
</div>
```
## Описание по data атрибутам
| Название свойства                       | Значение        | Описание                                                                                                                                  |
| --------------------------------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| data-tab-target="myID"                  | Не обязательное | Используйте данный атрибут если хотите задать свой ID. Если используете опцию `hash: true` рекомендуется прописывать id в данный атрибут. |
| data-tab-load="fetch.html"              | Не обязательное | Используйте данный атрибут если хотите подгрузить контент.                                                                                |
| data-tab-link="https://www.google.com/" | Не обязательное | Используйте данный атрибут если нужно указать ссылку на внешний ресурс.                                                                   |

## Конфигурация
| Название свойства | Тип            | Начальное значение | Описание                                                                                                          |
| ----------------- | -------------- | ------------------ | ----------------------------------------------------------------------------------------------------------------- |
| defaultTab        | number, string | 0                  | Таб который должен загрузиться по умолчанию. Указывать либо номер таба, либо id таба (data-tab-target).           |
| scroll            | boolean        | false              | Включить/выключить скролл до таба.                                                                                |
| offset            | number         | 0                  | Отступ сверху.                                                                                                    |
| hash              | boolean        | false              | Обновлять hash в адресной строке. Так же если при заходе на страницу есть хеш таба, то будет открыта эта вкладка. |
| a11y              | boolean        | true               | Включить/выключить доступность (accessibility).                                                                   |
| isChanged         | function       |                    | Срабатывает после выбора вкладки                                                                                  |

## Пример конфигурации
```js
const tabs = new InkTabs('.js-tabs', {
  defaultTab: 0,
  scroll: false,
  offset: 0,
  hash: false,
  a11y: true,
  isChanged: (tab) => console.log(tab)
});
```
