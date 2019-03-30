"use strict";
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 + ,--. o                   |    o                                            +
 + |   |.,---.,---.,---.    |    .,---.,---.                                  +
 + |   |||---'|   ||   |    |    ||   ||   |                                  +
 + `--' ``---'`---|`---'    `---'``   '`---|                                  +
 +            `---'                    `---'                                  +
 +                                                                            +
 + Copyright (C) 2016-2019, Yakov Panov (Yakov Ling)                          +
 + Mail: <diegoling33@gmail.com>                                              +
 +                                                                            +
 + Это программное обеспечение имеет лицензию, как это сказано в файле        +
 + COPYING, который Вы должны были получить в рамках распространения ПО.      +
 +                                                                            +
 + Использование, изменение, копирование, распространение, обмен/продажа      +
 + могут выполняться исключительно в согласии с условиями файла COPYING.      +
 +                                                                            +
 + Файл: ObservableProperty                                             +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
Object.defineProperty(exports, "__esModule", { value: true });
const Guard_1 = require("../../utils/Guard");
const Observable_1 = require("../Observable");
/**
 * Обрабатываемое значение
 * @class ObservableProperty
 * @template T
 * @augments Observable
 */
class ObservableProperty extends Observable_1.default {
    /**
     * Конструктор
     * @param {T|null} defaultValue
     */
    constructor(defaultValue = null) {
        super();
        /**
         * Флаг защиты от перезаписи
         * @ignore
         * @protected
         * @type {boolean}
         */
        this.isOverwriteProtected = false;
        /**
         * @protected
         * @type {T}
         */
        this.value = defaultValue || null;
    }
    /**
     * Простое автоматизированное свойство
     * @param context
     * @param value
     * @param prop
     */
    static simplePropertyAccess(context, value, prop) {
        if (!Guard_1.default.isSet(value))
            return prop.get(null);
        prop.set(value);
        return context;
    }
    /**
     * Возвращает значение или guard если значение null.
     *
     * Данный метод никогда не возвращает значение null. В случае, если значение
     * прослушиваемого параметра null или undefined, возвращает `guard` значение.
     *
     * @param {T} [guard]
     * @return {T}
     *
     *
     *     // Создаем прослушиваемый параметр
     *     let prop = new ObservableProperty<string>();
     *
     *     // Отображаем в консоль "защищенное" значение (с флагом guard)
     *     console.log( prop.get( "test" ) ); // test
     *
     *
     */
    get(guard) {
        if (this.isNull() && guard !== null)
            return guard;
        else if (this.isNull())
            return null;
        return this.value;
    }
    /**
     * Устанавливает флаг защиты от перезаписи.
     *
     * @param {boolean} flag
     * @return {this}
     *
     *
     *     // Создаем прослушиваемый параметр
     *     let prop = new ObservableProperty<string>();
     *     prop.set( "Tom" );
     *
     *     // Запрещаем перезапись
     *     prop.overwrite(false);
     *
     *     prop.set( "John" );
     *
     *     // Отображаем в консоль "защищенное" значение (с флагом guard)
     *     console.log( prop.get() ); // Tom
     *
     *
     */
    overwrite(flag) {
        this.isOverwriteProtected = flag;
        return this;
    }
    /**
     * Устанавливает значение и вызывает оповещение `change`, прослушиваемое
     * методом {@link ObservableProperty.change}.
     *
     * @param {T} value
     * @return {this}
     *
     *
     *     // Создаем прослушиваемый параметр
     *     let prop = new ObservableProperty<string>();
     *     prop.set( "Tom" );
     *
     *     // Отображаем в консоль "защищенное" значение (с флагом guard)
     *     console.log( prop.get() ); // Tom
     *
     *
     */
    set(value) {
        if (this.isOverwriteProtected)
            return this;
        const old = this.value;
        /**
         * @type {T}
         * @protected
         */
        this.value = value;
        this.notificate("change", [old, value]);
        return this;
    }
    /**
     * Возвращает true, если объект null или undefined.
     * @return {boolean}
     */
    isNull() {
        return Guard_1.default.isNone(this.value);
    }
    /**
     * Добавляет наблюдатель за изменением значения
     * @param {{function(value:T, oldValue:T?)}} observer - наблюдатель
     *
     *
     *
     *     // Создание свойства
     *     let observableString = new ObservableProperty<string>();
     *
     *     observableString.change( value => {
     *          console.log("Set to: " + value);
     *     });
     *
     *     observableString.set("123");
     *     observableString.set("abc");
     *
     *     // Вывод:
     *     // Set to: 123
     *     // Set to: abc
     *
     *
     *
     */
    change(observer) {
        this.addObserver("change", (old, nw) => {
            observer(nw, old);
        });
        return this;
    }
    /**
     * Преобразует объект в строку
     * @return {string}
     */
    toString() {
        return this.get() + "";
    }
}
exports.default = ObservableProperty;
