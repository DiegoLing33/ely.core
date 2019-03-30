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
 + Файл: Utils                                                          +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Утилиты
 *
 * @version 2.0 Рефракторинг и обновление утилит
 */
class Utils {
    /**
     * Возвращает true, если строка содержит число
     * @param str
     */
    static isNumber(str) {
        return /^(-?[0-9.]+)$/.test(str.toString());
    }
    /**
     * Возвращает первый элемент объекта
     * @param obj
     */
    static first(obj) {
        for (const index in obj) {
            if (obj.hasOwnProperty(index)) {
                return obj[index];
            }
        }
        return null;
    }
    /**
     * Возвращает массив значений
     * @param obj
     */
    static values(obj) {
        const values = [];
        Utils.forEach(obj, (index, value) => values.push(value));
        return values;
    }
    /**
     * Возвращает количество элементов в объекте
     * @param obj
     */
    static count(obj) {
        return Object.keys(obj).length;
    }
    /**
     * Цикл по эелментам
     * @param obj
     * @param callable
     */
    static forEach(obj, callable) {
        if (!obj)
            return null;
        let i = 0;
        for (const index in obj) {
            if (!obj.hasOwnProperty(index)) {
                continue;
            }
            const res = callable(index, obj[index], i);
            if (res === this.BREAK_FLAG) {
                return 1;
            }
            i++;
        }
        return 1;
    }
    /**
     * Выполняет поиск элемента по объекту с критерием filter
     * @param {*} obj - объект
     * @param {elyIterateClosure} filter - фильтр
     *
     * Фильтр принемает на вход 2 значения: index, value.
     * Если фильтр возвращает true, значение будет возвращено методом.
     *
     * @return {*}
     */
    static find(obj, filter) {
        let i = 0;
        for (const index in obj) {
            if (!obj.hasOwnProperty(index))
                continue;
            if (filter(index, obj[index], i))
                return { index, value: obj[index] };
            i++;
        }
        return { index: null, value: null, empty: true };
    }
    /**
     * Возвращает новый объект из фильтра
     * @param obj
     * @param filter
     */
    static filter(obj, filter) {
        if (obj instanceof Array) {
            const newArray = [];
            let i = 0;
            for (const index in obj) {
                if (obj.hasOwnProperty(index)) {
                    if (filter(index, obj[index], i))
                        newArray.push(obj[index]);
                    i++;
                }
            }
            return newArray;
        }
        else {
            const newObject = {};
            let i = 0;
            for (const index in obj) {
                if (!obj.hasOwnProperty(index))
                    continue;
                if (filter(index, obj[index], i))
                    newObject[index] = obj[index];
                i++;
            }
            return newObject;
        }
    }
    /**
     * Сортирует объект по алфавиту
     * @param obj
     */
    static sortAlphabetic(obj) {
        const ordered = {};
        Object.keys(obj).sort().forEach(key => {
            ordered[key] = obj[key];
        });
        return ordered;
    }
    /**
     * Подключение скрипта в шапку страницы
     * @param src
     * @param callback
     */
    static require(src, callback) {
        const script = document.createElement("script");
        script.src = src;
        script.onload = callback;
        document.getElementsByTagName("head")[0].appendChild(script);
    }
    /**
     * Удаляет выделение
     */
    static removeSelection() {
        if (window) {
            if (window.getSelection) {
                if (window.getSelection().empty) { // Chrome
                    window.getSelection().empty();
                }
                else if (window.getSelection().removeAllRanges) { // Firefox
                    window.getSelection().removeAllRanges();
                }
            }
        }
    }
    /**
     * Возвращает разные значения
     * @param obj1
     * @param obj2
     */
    static diffObj(obj1, obj2) {
        const newItem = {};
        for (const obj1Key in obj1) {
            if (!obj1.hasOwnProperty(obj1Key))
                continue;
            if (!obj2.hasOwnProperty(obj1Key))
                newItem[obj1Key] = obj1[obj1Key];
        }
        return newItem;
    }
    /**
     * Возвращает true, если в матрице найдено значение
     * @param matrix
     * @param value
     */
    static matrixHas(matrix, value) {
        return Utils.indexInMatrix(matrix, value) !== null;
    }
    /**
     * Возвращает пару индексов элемента матрицы
     * @param matrix
     * @param value
     */
    static indexInMatrix(matrix, value) {
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix.length; j++) {
                if (matrix[i][j] === value)
                    return [i, j];
            }
        }
        return null;
    }
    /**
     * Удаляет элемент из матрицы
     * @param matrix
     * @param value
     */
    static removeFromMatrix(matrix, value) {
        const indexes = Utils.indexInMatrix(matrix, value);
        if (!indexes)
            return false;
        matrix[indexes[0]].splice(indexes[1], 1);
        return true;
    }
    static cut(obj, len) {
        const keys = Object.keys(obj);
        const o = {};
        keys.sort((a, b) => {
            return a.length - b.length;
        });
        for (let i = 0; i < keys.length && i < len; i++) {
            o[keys[i]] = obj[keys[i]];
        }
        return o;
    }
    static applySrc(source, key, o, prefix = "", checker) {
        checker = checker || ((val) => val);
        if (typeof key === "string") {
            o[prefix + key] = checker(source[key]);
        }
        else {
            key.forEach((value) => {
                o[prefix + value] = checker(source[value]);
            });
        }
    }
    /**
     * Simple object check.
     * @param item
     * @returns {boolean}
     */
    static isObject(item) {
        return (item && typeof item === "object" && !Array.isArray(item));
    }
    /**
     * Deep merge two objects.
     * @param target
     * @param sources
     */
    static mergeDeep(target, ...sources) {
        if (!sources.length)
            return target;
        const source = sources.shift();
        if (Utils.isObject(target) && Utils.isObject(source)) {
            for (const key in source) {
                if (!source.hasOwnProperty(key))
                    continue;
                if (Utils.isObject(source[key])) {
                    if (!target[key])
                        Object.assign(target, { [key]: {} });
                    Utils.mergeDeep(target[key], source[key]);
                }
                else {
                    Object.assign(target, { [key]: source[key] });
                }
            }
        }
        return Utils.mergeDeep(target, ...sources);
    }
}
Utils.BREAK_FLAG = "ely_for_loop_break_312441edq2jhd78q2df67q";
exports.default = Utils;
