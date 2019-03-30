declare type elyIterateClosure = (index: any, value: any, iteration: number) => boolean | any | void;
/**
 * Утилиты
 *
 * @version 2.0 Рефракторинг и обновление утилит
 */
export default class Utils {
    static BREAK_FLAG: string;
    /**
     * Возвращает true, если строка содержит число
     * @param str
     */
    static isNumber(str: string): boolean;
    /**
     * Возвращает первый элемент объекта
     * @param obj
     */
    static first(obj: any): any;
    /**
     * Возвращает массив значений
     * @param obj
     */
    static values(obj: any): any[];
    /**
     * Возвращает количество элементов в объекте
     * @param obj
     */
    static count(obj: object): number;
    /**
     * Цикл по эелментам
     * @param obj
     * @param callable
     */
    static forEach(obj: any, callable: elyIterateClosure): 1 | null;
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
    static find(obj: any, filter: elyIterateClosure): {
        index: string;
        value: any;
        empty?: undefined;
    } | {
        index: null;
        value: null;
        empty: boolean;
    };
    /**
     * Возвращает новый объект из фильтра
     * @param obj
     * @param filter
     */
    static filter(obj: any | any[], filter: elyIterateClosure): {} | any[] | any;
    /**
     * Сортирует объект по алфавиту
     * @param obj
     */
    static sortAlphabetic(obj: any): any;
    /**
     * Подключение скрипта в шапку страницы
     * @param src
     * @param callback
     */
    static require(src: string, callback: () => void): void;
    /**
     * Удаляет выделение
     */
    static removeSelection(): void;
    /**
     * Возвращает разные значения
     * @param obj1
     * @param obj2
     */
    static diffObj(obj1: any, obj2: any): {};
    /**
     * Возвращает true, если в матрице найдено значение
     * @param matrix
     * @param value
     */
    static matrixHas(matrix: any[][], value: any): boolean;
    /**
     * Возвращает пару индексов элемента матрицы
     * @param matrix
     * @param value
     */
    static indexInMatrix(matrix: any[][], value: any): [number, number] | null;
    /**
     * Удаляет элемент из матрицы
     * @param matrix
     * @param value
     */
    static removeFromMatrix(matrix: any[][], value: any): boolean;
    static cut(obj: any, len: number): {};
    static applySrc(source: {
        [name: string]: any;
    }, key: string | string[], o: {
        [name: string]: any;
    }, prefix?: string, checker?: (s: string) => string): void;
    /**
     * Simple object check.
     * @param item
     * @returns {boolean}
     */
    static isObject(item: any): boolean;
    /**
     * Deep merge two objects.
     * @param target
     * @param sources
     */
    static mergeDeep(target: any, ...sources: any[]): any;
}
export {};
