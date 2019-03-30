/******************************************************************************
 *                                                                            *
 * ,--. o                   |    o                                            *
 * |   |.,---.,---.,---.    |    .,---.,---.                                  *
 * |   |||---'|   ||   |    |    ||   ||   |                                  *
 * `--' ``---'`---|`---'    `---'``   '`---|                                  *
 *            `---'                    `---'                                  *
 *                                                                            *
 * Copyright (C) 2016-2019, Yakov Panov (Yakov Ling)                          *
 * Mail: <diegoling33@gmail.com>                                              *
 *                                                                            *
 * Это программное обеспечение имеет лицензию, как это сказано в файле        *
 * COPYING, который Вы должны были получить в рамках распространения ПО.      *
 *                                                                            *
 * Использование, изменение, копирование, распространение, обмен/продажа      *
 * могут выполняться исключительно в согласии с условиями файла COPYING.      *
 *                                                                            *
 * Проект: ely.core                                                           *
 *                                                                            *
 * Файл: SizeValue.ts                                                         *
 * Файл изменен: 27.03.2019 18:59:07                                          *
 *                                                                            *
 ******************************************************************************/
/**
 * Опции объектов: {@link SizeConstValue} {@link SizeValue}
 */
export interface ISizeConstValueProps {
    /**
     * Ширина
     */
    width?: number;
    /**
     * Высота
     */
    height?: number;
    /**
     * Глубина
     */
    depth?: number;
    /**
     * Диагональ
     */
    d?: number;
}
/**
 * Неизменяемый размер
 * @class {SizeConstValue}
 */
export declare class SizeConstValue {
    /**
     * Создаёт нулевой объект
     * @return {SizeConstValue}
     */
    static zero(): SizeConstValue;
    /**
     * @ignore
     * @protected
     */
    protected __width: number;
    /**
     * @ignore
     * @protected
     */
    protected __height: number;
    /**
     * @ignore
     * @protected
     */
    protected __depth: number;
    /**
     * Конструктор
     * @param {ISizeConstValueProps} props
     * @constructor
     */
    constructor(props?: ISizeConstValueProps);
    /**
     * Возвращает значение ширины
     * @return {number}
     */
    width(): number;
    /**
     * Возвращает значение высоты
     * @return {number}
     */
    height(): number;
    /**
     * Возвращает значение глубины
     * @return {number}
     */
    depth(): number;
    /**
     * Создает значения
     * @return {SizeValue}
     */
    getValue(): SizeValue;
}
/**
 * Размер
 * @class {SizeValue}
 */
export default class SizeValue extends SizeConstValue {
    /**
     * Создаёт нулевой объект
     * @return {SizeValue}
     */
    static zero(): SizeValue;
    /**
     * Возвращает сумму размеров
     * @param {...SizeConstValue} s
     * @return {SizeConstValue}
     */
    static getSum(...s: SizeConstValue[]): SizeConstValue;
    /**
     * Конструктор
     * @param {ISizeConstValueProps} props
     * @constructor
     */
    constructor(props?: ISizeConstValueProps);
    /**
     * Устанавливает размер по диагонали
     * @param {number} d - значение диагонали
     */
    setDiagonal(d: number): SizeValue;
    /**
     * Возвращает значение ширины
     * @return {number}
     */
    width(): number;
    /**
     * Устанавливает значение ширины
     * @param {number} value - значение
     * @return {this}
     */
    width(value: number): SizeValue;
    /**
     * Возвращает значение высоты
     * @return {number}
     */
    height(): number;
    /**
     * Устанавливает значение высоты
     * @param {number} value - значение
     * @return {this}
     */
    height(value: number): SizeValue;
    /**
     * Возвращает значение глубины
     * @return {number}
     */
    depth(): number;
    /**
     * Устанавливает значение глубины
     * @param {number} value - значение
     * @return {this}
     */
    depth(value: number): SizeValue;
    /**
     * Прибавляет значение к размеру
     * @param {{ width?: number, height?: number, depth?: number, s: SizeConstValue}} props - значения
     * @return {SizeValue}
     */
    add(props: {
        width?: number;
        height?: number;
        depth?: number;
        s: SizeConstValue;
    }): SizeValue;
    /**
     * Умножает размеры и значения
     * @param {{ width?: number, height?: number, depth?: number, s: SizeConstValue}} props - значения
     * @return {SizeValue}
     */
    mul(props?: {
        width?: number;
        height?: number;
        depth?: number;
        s?: SizeConstValue;
    }): SizeValue;
    /**
     * Делит размеры и значения
     * @param {{ width?: number, height?: number, depth?: number, s: SizeConstValue}} props - значения
     * @return {SizeValue}
     */
    subdivide(props?: {
        width?: number;
        height?: number;
        depth?: number;
        s?: SizeConstValue;
    }): SizeValue;
    /**
     * Возвращает константный объект разницы
     * @param {SizeConstValue} s - вектор сравнения
     * @param {boolean} [abs = false] - абсолютные значения
     * @return {SizeConstValue}
     */
    getDiffs(s: SizeConstValue, abs?: boolean): SizeConstValue;
    /**
     * Возвращает true, если объекты идентичны
     * @param {SizeConstValue} s - вектор
     * @return {boolean}
     */
    equals(s: SizeConstValue): boolean;
    /**
     * Создает постоянные значения
     * @return {SizeConstValue}
     */
    getConstValue(): SizeConstValue;
}
/**
 * @typedef {Object} ISizeConstValueProps
 * @property {number} [width = 0] - ширина
 * @property {number} [height = 0] - высота
 * @property {number} [depth = 0] - глубина
 * @property {number} [d = 0] - диагональ
 */
