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
 + Файл: ObservableDictionary                                           +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
Object.defineProperty(exports, "__esModule", { value: true });
const Guard_1 = require("../../utils/Guard");
const Utils_1 = require("../../utils/Utils");
const ObservableProperty_1 = require("./ObservableProperty");
/**
 * Свойство словаря
 * @class ObservableDictionary
 * @template T
 */
class ObservableDictionary extends ObservableProperty_1.default {
    /**
     * Конструктор
     * @param defaultValue
     */
    constructor(defaultValue = {}) {
        super(defaultValue);
    }
    /**
     * Возвращакт словарь, как объекта
     */
    get() {
        return super.get();
    }
    /**
     * Слушатель добавления новго элемента в словаре
     * @param observer
     */
    addNewItemObserver(observer) {
        this.addObserver("newItem", observer);
        return this;
    }
    getSorted(handler) {
        const ordered = new ObservableDictionary();
        Object.keys(this.value).sort(handler).forEach((key) => {
            ordered.add(key, this.value[key]);
        });
        return this;
    }
    /**
     * Слушатель удаления элемента в словаре
     * @param observer
     */
    addRemoveItemObserver(observer) {
        this.addObserver("removeItem", observer);
        return this;
    }
    /**
     * Возвращает элемент словаря или NULL
     * @param key
     */
    item(key) {
        const val = (this.value || {})[key];
        return Guard_1.default.isNone(val) ? null : val;
    }
    /**
     * Возвращает элемент по индексу
     * @param index
     */
    itemByIndex(index) {
        const key = Object.keys(this.value)[index];
        return key ? { key, value: this.value[key] } : null;
    }
    /**
     * Добавляет значение в словарь
     * @param key   - ключ
     * @param value - значение
     */
    add(key, value) {
        this.value[key] = value;
        this.notificate("change", [this.value]);
        this.notificate("newItem", [key, value]);
        return this;
    }
    /**
     * Удаляет значение из словаря
     * @param key
     */
    remove(key) {
        if (this.value.hasOwnProperty(key)) {
            const copy = this.value[key];
            delete this.value[key];
            this.notificate("change", [this.value]);
            this.notificate("removeItem", [key, copy]);
            return true;
        }
        return false;
    }
    /**
     * Очищает словарь
     */
    clear() {
        this.set({});
        return this;
    }
    /**
     * Возвращает количество элементов в словаре
     *
     *
     *     // Создаём словарь
     *     let dictionary = new ely.observable.dictionary();
     *
     *     // Заполняем его элементами
     *     dictionary.add("a", 100);
     *     dictionary.add("b", 200);
     *     dictionary.add("c", 300);
     *
     *     console.log( dictionary.count() );
     *
     *     //3
     *
     *
     */
    count() {
        let count = 0;
        Utils_1.default.forEach(this.value, () => count++);
        return count;
    }
    /**
     * Цикл по всем элементам словаря
     * @param iterator
     *
     *
     *     // Создаём словарь
     *     let dictionary = new ely.observable.dictionary();
     *
     *     // Заполняем его элементами
     *     dictionary.add("a", 100);
     *     dictionary.add("b", 200);
     *     dictionary.add("c", 300);
     *
     *     dictionary.forEach( (key, value) => {
     *        console.log(key + " " + value);
     *     });
     *
     *     //a 100
     *     //b 200
     *     //c 300
     *
     *
     */
    forEach(iterator) {
        Utils_1.default.forEach(this.value, iterator);
        return this;
    }
    /**
     * Возвращает true, если существует ключ
     * @param key
     */
    contains(key) {
        return this.value.hasOwnProperty(key);
    }
    /**
     * Возвращает первый индекс значения или null, если значение не найдено.
     *
     * Данный метод можно использовать для проверки наличия значения.
     *
     * @param value
     */
    keyOf(value) {
        let searched = null;
        Utils_1.default.forEach(this.value, (index, value1) => {
            if (value1 === value) {
                searched = index;
                return Utils_1.default.BREAK_FLAG;
            }
        });
        return searched;
    }
}
exports.default = ObservableDictionary;
