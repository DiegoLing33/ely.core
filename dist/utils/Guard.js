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
 + Файл: Guard.ts                                                             +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Защита данных
 * @class Guard
 */
class Guard {
    /**
     * Безопасная операция над переменной
     *
     * @template T - Тип данных переменной
     * @param {T|*} testVar - Проверяемая переменная
     * @param {function(value: T)} callback - Обработчик с переменной
     * @param {T} [opt] - Опциональное значение, если переменная null или undefined
     * @return
     *
     * ```typescript
     *
     * const a = 123;
     * const b = null;
     *
     * Guard.variable(b, value => a = value, 100);
     * Guard.variable(a, value => b = value);
     *
     * // a = 100
     * // b = 100
     * ```
     *
     */
    static variable(testVar, callback, opt) {
        if (testVar !== undefined && testVar !== null)
            callback(testVar);
        else if (Guard.isSet(opt))
            callback(opt);
    }
    /**
     * Безопасная операция над переменной и выполнение операции через объект и контекст
     *
     * @template T - Тип данных переменной
     * @param {T|*} testVar - Проверяемая переменная
     * @param {function(value: T)} callback - Обработчик с переменной
     * @param {*} [context] - Контекст
     * @param {T} [opt] - Опциональное значение, если переменная null или undefined
     *
     * @return
     *
     * ```typescript
     *
     * class MyClass{
     *
     *      public constructor(options = {}){
     *          this.a = null;
     *          this.b = null;
     *
     *          Guard.variableAndSet(options.a, this.setA, this, "theA");
     *          Guard.variableAndSet(options.b, this.setB, this, "theB");
     *
     *          // Альтернатива:
     *          // Guard.variable(options.a, value => this.setA(value), "theA");
     *          // Guard.variable(options.b, value => this.setB(value), "theB");
     *      }
     *
     *      setA(value){
     *          this.a = value;
     *      }
     *
     *      setB(value){
     *          this.b = value;
     *      }
     *
     * }
     *
     * const mc = new MyClass({a: 123});
     * // mc.a = 123
     * // mc.b = "theB"
     * ```
     */
    static variableAndSet(testVar, callback, context, opt) {
        Guard.variable(testVar, (value) => {
            callback.call(context, value);
        }, opt);
    }
    /**
     * Возвращает true, если obj не undefined
     * @param {*} obj
     * @return {boolean}
     */
    static isSet(obj) {
        return obj !== undefined;
    }
    /**
     * Возвращает true, если obj undefined или null.
     * @param {*} obj
     * @return {boolean}
     */
    static isNone(obj) {
        return obj === undefined || obj === null;
    }
    /**
     * Парсинг JSON *без try/catch* конструкции
     *
     * @param {string} jsonString - строка JSON
     * @param {*} [opt = {}] - значение в случае неудачи
     *
     * @return {*}
     *
     * ```typescript
     *
     * const a = safeJsonParse("a");
     * const b = safeJsonParse("{\"a\": 1}");
     *
     * // a = {}
     * // b = {a: 1};
     * ```
     *
     */
    static safeJsonParse(jsonString, opt = {}) {
        try {
            return JSON.parse(jsonString);
        }
        catch (e) {
            return opt;
        }
    }
}
exports.default = Guard;
