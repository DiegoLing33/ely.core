/**
 * Защита данных
 * @class Guard
 */
export default class Guard {
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
    static variable<T>(testVar: any, callback: (value: T) => void, opt?: T): void;
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
    static variableAndSet<T>(testVar: any, callback: (value: T) => void, context: any, opt?: T): void;
    /**
     * Возвращает true, если obj не undefined
     * @param {*} obj
     * @return {boolean}
     */
    static isSet(obj: any): boolean;
    /**
     * Возвращает true, если obj undefined или null.
     * @param {*} obj
     * @return {boolean}
     */
    static isNone(obj: any): obj is null;
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
    static safeJsonParse(jsonString: string, opt?: any): any;
}
