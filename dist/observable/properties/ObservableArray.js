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
 + Файл: ObservableArray.ts                                             +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
Object.defineProperty(exports, "__esModule", { value: true });
const ObservableProperty_1 = require("./ObservableProperty");
/**
 * Массив
 * @template T
 * @class ObservableArray
 * @augments ObservableProperty.<T[]>
 */
class ObservableArray extends ObservableProperty_1.default {
    /**
     * Конструктор
     */
    constructor() {
        super([]);
    }
    /**
     * Возвращает массив
     * @return {T[]}
     */
    get() {
        return this.value || [];
    }
    /**
     * Регистрирует слушатель добавления нового элемента в массив
     * @param {function(newItem: {T}, index: number)} observer - слушатель
     */
    addNewItemObserver(observer) {
        return this.addObserver("add", observer);
    }
    /**
     * Регистрирует слушатель изменения элементов массива
     * @param observer - слушатель
     */
    addChangeItemsObserver(observer) {
        return this.addObserver("change", observer);
    }
    /**
     * Регистрирует слушатель очищения массива
     * @param observer - слушатель
     */
    addClearObserver(observer) {
        return this.addObserver("clear", observer);
    }
    /**
     * Регистрирует слушатель удаления элемента массива
     * @param observer - слушатель
     */
    addRemoveObserver(observer) {
        return this.addObserver("remove", observer);
    }
    /**
     * Добавляет элемент в массив
     * @param item
     */
    push(item) {
        this.value.push(item);
        this.notificate("change", [this.get()]);
        this.notificate("add", [item, this.value.length - 1]);
        return this;
    }
    /**
     * Добавляет элемент в массив по индексу
     * @param {number} index
     * @param {...T} items
     */
    insert(index, ...items) {
        this.value.splice(index, 0, ...items);
        this.notificate("change", [this.get()]);
        this.notificate("add", [index, ...items]);
        return this;
    }
    /**
     * Добавляет элемент в массив
     * @param {number} index
     * @return {this}
     */
    remove(index) {
        const item = this.item(index);
        this.value.splice(index, 1);
        this.notificate("change", [this.get()]);
        this.notificate("remove", [item]);
        return this;
    }
    /**
     * Удаляет элемент из массива
     * @param {T} item - элемент массива
     * @return {this}
     */
    removeItem(item) {
        const index = this.indexOf(item);
        this.remove(index);
        return this;
    }
    /**
     * Возвращает элемент массива
     * @param {number} index
     */
    item(index) {
        return this.value[index];
    }
    /**
     * Возвращает последний элемент
     * @return {T}
     */
    last() {
        return this.value[this.value.length - 1];
    }
    /**
     * Возвращает последний элемент и удаляет его из массива
     * @return {T}
     */
    pop() {
        const val = this.items().pop();
        return val === undefined ? null : val;
    }
    /**
     * Возвращает длину массива
     * @return {number}
     */
    length() {
        return this.value.length;
    }
    /**
     * Возвращает true, если существует индекс
     * @param {number} index
     */
    hasIndex(index) {
        return !!this.value[index];
    }
    /**
     * Возвращает индекс элемента в массиве или -1, если
     * элемент не найден
     * @param {T} item
     */
    indexOf(item) {
        return this.value.indexOf(item);
    }
    /**
     * Возвращает true, если массив содержит item
     * @param {T} item
     */
    hasItem(item) {
        return this.indexOf(item) > -1;
    }
    /**
     * Очищает массив
     * @return {this}
     */
    clear() {
        this.value = [];
        this.notificate("change", [this.get()]);
        this.notificate("clear", []);
        return this;
    }
    /**
     * Возвращает true, если массив пустой
     * @return {boolean}
     */
    isEmpty() {
        return this.length() === 0;
    }
    /**
     * Элементы
     * @return {T[]}
     */
    items() {
        return this.value;
    }
    /**
     * Устанавливает элемент в индексе массива
     * @param {T} item - элемент
     * @param {number} index - индекс
     * @deprecated Данный метод не рекомендуется к спользованию!
     */
    setItemAtIndex(item, index) {
        this.value[index] = item;
        this.notificate("change", [this.get()]);
        return this;
    }
    /**
     * Цикл по элементам массива
     * @param {function(item: T, index: number, items: T[])} callbackfn - обработчик
     */
    forEach(callbackfn) {
        this.items().forEach((value, index, array) => callbackfn(value, index, array));
        return this;
    }
}
exports.default = ObservableArray;
