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
 * Файл: VectorValue.ts                                                     *
 * Файл изменен: 27.03.2019 19:04:31                                          *
 *                                                                            *
 ******************************************************************************/
/**
 * Опции объектов: {@link VectorConstValue} {@link VectorValue}
 */
export interface IVectorValueProps {
    /**
     * Координата x
     */
    x?: number;
    /**
     * Координата y
     */
    y?: number;
    /**
     * Координата z
     */
    z?: number;
}
/**
 * Вектор с постоянными значениями
 * @class VectorConstValue
 */
export declare class VectorConstValue {
    /**
     * @ignore
     * @protected
     */
    protected __x: number;
    /**
     * @ignore
     * @protected
     */
    protected __y: number;
    /**
     * @ignore
     * @protected
     */
    protected __z: number;
    /**
     * Конструктор
     * @param {IVectorValueProps} [props = {}]
     */
    constructor(props?: IVectorValueProps);
    /**
     * Возвращает значение по оси X
     * @return {number}
     */
    x(): number;
    /**
     * Возвращает значение по оси Y
     * @return {number}
     */
    y(): number;
    /**
     * Возвращает значение по оси Z
     * @return {number}
     */
    z(): number;
    /**
     * Создает векторные значения
     * @return {VectorValue}
     */
    getValue(): VectorValue;
}
/**
 * Значения вектора
 * @class VectorValue
 */
export default class VectorValue extends VectorConstValue {
    /**
     * Возвращает сумму векторов
     * @param {...VectorConstValue} v
     * @return {VectorConstValue}
     */
    static getSum(...v: Array<VectorValue | VectorConstValue>): VectorConstValue;
    /**
     * Конструктор
     * @param {IVectorValueProps} [props = {}]
     */
    constructor(props?: IVectorValueProps);
    /**
     * Возвращает значение по оси X
     * @return {number}
     */
    x(): number;
    /**
     * Устанавливает значение по оси X
     * @param {number} value - значение
     * @return {this}
     */
    x(value: number): VectorValue;
    /**
     * Возвращает значение по оси Y
     * @return {number}
     */
    y(): number;
    /**
     * Устанавливает значение по оси Y
     * @param {number} value - значение
     * @return {this}
     */
    y(value: number): VectorValue;
    /**
     * Возвращает значение по оси Z
     * @return {number}
     */
    z(): number;
    /**
     * Устанавливает значение по оси Z
     * @param {number} value - значение
     * @return {this}
     */
    z(value: number): VectorValue;
    /**
     * Прибавляет значение к вектору
     * @param {{ x?: number, y?: number, z?: number, v?: VectorValue | VectorConstValue }} props - значения
     * @return {VectorValue}
     */
    add(props?: {
        x?: number;
        y?: number;
        z?: number;
        v?: VectorValue | VectorConstValue;
    }): VectorValue;
    /**
     * Умножает векторы и значения
     * @param {{ x?: number, y?: number, z?: number, v?: VectorValue | VectorConstValue }} props - значения
     * @return {VectorValue}
     */
    mul(props?: {
        x?: number;
        y?: number;
        z?: number;
        v?: VectorValue | VectorConstValue;
    }): VectorValue;
    /**
     * Делит векторы и значения
     * @param {{ x?: number, y?: number, z?: number, v?: VectorValue | VectorConstValue }} props - значения
     * @return {VectorValue}
     */
    subdivide(props?: {
        x?: number;
        y?: number;
        z?: number;
        v?: VectorValue | VectorConstValue;
    }): VectorValue;
    /**
     * Возвращает константный объект разницы
     * @param {VectorValue|VectorConstValue} v - вектор сравнения
     * @param {boolean} [abs = false] - абсолютные значения
     * @return {VectorConstValue}
     */
    getDiffs(v: VectorValue | VectorConstValue, abs?: boolean): VectorConstValue;
    /**
     * Возвращает true, если объекты идентичны
     * @param {VectorValue|VectorConstValue} v - вектор
     * @return {boolean}
     */
    equals(v: VectorConstValue | VectorValue): boolean;
    /**
     * Создает постоянные векторные значения
     * @return {VectorConstValue}
     */
    getConstValue(): VectorConstValue;
}
/**
 * @typedef {Object} IVectorValueProps
 * @property {number} [x = 0]
 * @property {number} [y = 0]
 * @property {number} [z = 0]
 */
