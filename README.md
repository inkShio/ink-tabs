# InkTabs
Простая JavaScript-библиотека табов.
Минимум стилей. Кастомизируй под свои нужды.
Посмотреть примеры можно [тут](https://inkshio.github.io/ink-tabs/).

## Установка
```shell
npm i ink-tabs --save
```

## Подключение
```js
import InkTabs from 'ink-tabs';
```
```scss
// InkTabs
@use '/path/to/node_modules/ink-tabs/src/ink-tabs';
// или если нужно переопределить стандартные классы
@use '/path/to/node_modules/ink-tabs/src/ink-tabs' with (
  $tab-container: 'ink-tabs',
  $tab-panel-active: 'active'
);
```
```js
const tabs = new InkTabs('.js-tabs');
```

```html
<div class="ink-tabs js-tabs">
  <ul class="ink-tabs__nav">
    <li class="ink-tabs__item"><button class="ink-tabs__button" type="button" data-tab-target="tab-one">Один</button></li>
    <li class="ink-tabs__item"><button class="ink-tabs__button" type="button">Два</button></li>
    <li class="ink-tabs__item"><button class="ink-tabs__button" type="button">Три</button></li>
    <li class="ink-tabs__item"><button class="ink-tabs__button" type="button">Вложенный таб</button></li>
    <li class="ink-tabs__item"><button class="ink-tabs__button" type="button" data-tab-load="fetch.html">Fetch Load</button></li>
    <li class="ink-tabs__item"><button class="ink-tabs__button" type="button" data-tab-load="fetch.html" data-tab-chunk=".fetch-chunk">Fetch Load</button></li>
    <li class="ink-tabs__item"><button class="ink-tabs__button" type="button" data-tab-link="https://www.google.com/">Google Link</button></li>
    <li class="ink-tabs__item"><button class="ink-tabs__button" type="button" data-tab-link="https://www.google.com/ "data-tab-link-target="_blank">Google Link (New Tab)</button></li>
  </ul>
  <div class="ink-tabs__content">
    <div class="ink-tabs__panel">Контент Один</div>
    <div class="ink-tabs__panel">Контент Два</div>
    <div class="ink-tabs__panel">Контент Три</div>
    <div class="ink-tabs__panel">
      Вложенный таб
      <div class="ink-tabs js-tabs">
        <ul class="ink-tabs__nav">
          <li class="ink-tabs__item"><button class="ink-tabs__button" type="button">Один</button></li>
          <li class="ink-tabs__item"><button class="ink-tabs__button" type="button">Два</button></li>
        </ul>
        <div class="ink-tabs__content">
          <div class="ink-tabs__panel">Вложенный контент Один</div>
          <div class="ink-tabs__panel">Вложенный контент Два</div>
        </div>
      </div>
    </div>
    <div class="ink-tabs__panel">fetch</div>
    <div class="ink-tabs__panel">fetch chunk</div>
    <div class="ink-tabs__panel">link</div>
    <div class="ink-tabs__panel">link blank</div>
  </div>
</div>
```
## Описание по data атрибутам
| Название свойства                       | Значение        | Описание                                                                                                                                  |
| --------------------------------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| data-tab-target="myID"                  | Не обязательное | Используйте данный атрибут если хотите задать свой ID. Если используете опцию `hash: true` рекомендуется прописывать id в данный атрибут. |
| data-tab-load="fetch.html"              | Не обязательное | Используйте данный атрибут если хотите подгрузить контент.                                                                                |
| data-tab-chunk="#myContent"             | Не обязательное | Используется вместе с `data-tab-load`. Укажите селектор (ID или класс) элемента, который нужно извлечь из загруженного контента.          |
| data-tab-link="https://www.google.com/" | Не обязательное | Используйте данный атрибут если нужно указать ссылку на внешний ресурс.                                                                   |
| data-tab-link-target="_blank"           | Не обязательное | Используется вместе с `data-tab-link`. Укажите, где открывать ссылку (например, `_blank` для новой вкладки).                              |

## Конфигурация
| Название свойства | Тип            | Начальное значение | Описание                                                                                                          |
| ----------------- | -------------- | ------------------ | ----------------------------------------------------------------------------------------------------------------- |
| defaultTab        | number, string | 0                  | Таб который должен загрузиться по умолчанию. Указывать либо номер таба, либо id таба (data-tab-target).           |
| scroll            | boolean        | false              | Включить/выключить скролл до таба.                                                                                |
| offset            | number         | 0                  | Отступ сверху.                                                                                                    |
| hash              | boolean        | false              | Обновлять hash в адресной строке. Так же если при заходе на страницу есть хеш таба, то будет открыта эта вкладка. |
| a11y              | boolean        | true               | Включить/выключить доступность (accessibility).                                                                   |
| classNames        | object         | {}                 | Объект с именами классов для кастомизации.                                                                        |
| - container       | string         | ink-tabs           | Класс главного контейнера                                                                                         |
| - nav             | string         | ink-tabs__nav      | Класс контейнера навигации                                                                                        |
| - item            | string         | ink-tabs__item     | Класс элемента навигации                                                                                          |
| - itemActive      | string         | active             | Активный класс элемента навигации                                                                                 |
| - button          | string         | ink-tabs__button   | Класс кнопки                                                                                                      |
| - buttonActive    | string         | active             | Активный класс кнопки                                                                                             |
| - content         | string         | ink-tabs__content  | Класс контейнера контента                                                                                         |
| - panel           | string         | ink-tabs__panel    | Класс панели                                                                                                      |
| - panelActive     | string         | active             | Активный класс панелим                                                                                            |
| isChanged         | function       |                    | Срабатывает после выбора вкладки.                                                                                 |

## Пример конфигурации
```js
const tabs = new InkTabs('.js-tabs', {
  defaultTab: 0,
  scroll: false,
  offset: 0,
  hash: false,
  a11y: true,
  classNames: {
    container: 'ink-tabs',
    nav: 'ink-tabs__nav',
    item: 'ink-tabs__item',
    itemActive: 'active',
    button: 'ink-tabs__button',
    buttonActive: 'active',
    content: 'ink-tabs__content',
    panel: 'ink-tabs__panel',
    panelActive: 'active'
  },
  isChanged: (tab) => console.log(tab)
});
```

## Команды для сборки
```
npm run build - продакшн
npm run dev - разработка
```
