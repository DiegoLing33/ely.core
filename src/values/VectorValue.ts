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

import {variable} from "../utils/Guard";

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
export class VectorConstValue {

    /**
     * @ignore
     * @protected
     */
    protected __x: number = 0;

    /**
     * @ignore
     * @protected
     */
    protected __y: number = 0;

    /**
     * @ignore
     * @protected
     */
    protected __z: number = 0;

    /**
     * Конструктор
     * @param {IVectorValueProps} [props = {}]
     */
    public constructor(props: IVectorValueProps = {}) {
        this.__x = props.x || 0;
        this.__y = props.y || 0;
        this.__z = props.z || 0;

    }

    /**
     * Возвращает значение по оси X
     * @return {number}
     */
    public x(): number {
        return this.__x;
    }

    /**
     * Возвращает значение по оси Y
     * @return {number}
     */
    public y(): number {
        return this.__y;
    }

    /**
     * Возвращает значение по оси Z
     * @return {number}
     */
    public z(): number {
        return this.__z;
    }

    /**
     * Создает векторные значения
     * @return {VectorValue}
     */
    public getValue(): VectorValue {
        return new VectorValue({x: this.x(), y: this.y(), z: this.z()});
    }
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
    public static getSum(...v: Array<VectorValue | VectorConstValue>): VectorConstValue {
        const vec = new VectorValue();
        v.forEach(vc => vec.add({v: vc}));
        return vec.getConstValue();
    }

    /**
     * Конструктор
     * @param {IVectorValueProps} [props = {}]
     */
    public constructor(props: IVectorValueProps = {}) {
        super(props);
    }

    /**
     * Возвращает значение по оси X
     * @return {number}
     */
    public x(): number;

    /**
     * Устанавливает значение по оси X
     * @param {number} value - значение
     * @return {this}
     */
    public x(value: number): VectorValue;

    /**
     * Возвращает и устанавливает значение по оси X
     * @param {number} [value] - значение
     * @returns {number|this|null}
     */
    public x(value?: number): number | null | VectorValue {
        if (value === undefined) return this.__x;
        this.__x = value;
        return this;
    }

    /**
     * Возвращает значение по оси Y
     * @return {number}
     */
    public y(): number;

    /**
     * Устанавливает значение по оси Y
     * @param {number} value - значение
     * @return {this}
     */
    public y(value: number): VectorValue;

    /**
     * Возвращает и устанавливает значение по оси Y
     * @param {number} [value] - значение
     * @returns {number|this|null}
     */
    public y(value?: number): number | null | VectorValue {
        if (value === undefined) return this.__y;
        this.__y = value;
        return this;
    }

    /**
     * Возвращает значение по оси Z
     * @return {number}
     */
    public z(): number;

    /**
     * Устанавливает значение по оси Z
     * @param {number} value - значение
     * @return {this}
     */
    public z(value: number): VectorValue;

    /**
     * Возвращает и устанавливает значение по оси Z
     * @param {number} [value] - значение
     * @returns {number|this|null}
     */
    public z(value?: number): number | null | VectorValue {
        if (value === undefined) return this.__z;
        this.__z = value;
        return this;
    }

    /**
     * Прибавляет значение к вектору
     * @param {{ x?: number, y?: number, z?: number, v?: VectorValue | VectorConstValue }} props - значения
     * @return {VectorValue}
     */
    public add(props: { x?: number, y?: number, z?: number, v?: VectorValue | VectorConstValue } = {}): VectorValue {
        if (props.v) {
            this.x(this.x() + props.v.x());
            this.y(this.y() + props.v.y());
            this.z(this.z() + props.v.z());
        } else {
            this.x(this.x() + (props.x || 0));
            this.x(this.y() + (props.y || 0));
            this.x(this.z() + (props.y || 0));
        }
        return this;
    }

    /**
     * Умножает векторы и значения
     * @param {{ x?: number, y?: number, z?: number, v?: VectorValue | VectorConstValue }} props - значения
     * @return {VectorValue}
     */
    public mul(props: { x?: number, y?: number, z?: number, v?: VectorValue | VectorConstValue } = {}): VectorValue {
        if (props.v) {
            this.x(this.x() * props.v.x());
            this.y(this.y() * props.v.y());
            this.z(this.z() * props.v.z());
        } else {
            variable<number>(props.x, v => this.x(this.x() * v));
            variable<number>(props.y, v => this.y(this.y() * v));
            variable<number>(props.z, v => this.z(this.z() * v));
        }
        return this;
    }

    /**
     * Делит векторы и значения
     * @param {{ x?: number, y?: number, z?: number, v?: VectorValue | VectorConstValue }} props - значения
     * @return {VectorValue}
     */
    public subdivide(props: { x?: number, y?: number, z?: number, v?: VectorValue | VectorConstValue } = {}):
        VectorValue {
        if (props.v) {
            this.x(this.x() / props.v.x());
            this.y(this.y() / props.v.y());
            this.z(this.z() / props.v.z());
        } else {
            variable<number>(props.x, v => this.x(this.x() / v));
            variable<number>(props.y, v => this.y(this.y() / v));
            variable<number>(props.z, v => this.z(this.z() / v));
        }
        return this;
    }

    /**
     * Возвращает константный объект разницы
     * @param {VectorValue|VectorConstValue} v - вектор сравнения
     * @param {boolean} [abs = false] - абсолютные значения
     * @return {VectorConstValue}
     */
    public getDiffs(v: VectorValue | VectorConstValue, abs: boolean = false): VectorConstValue {
        if (abs) return new VectorConstValue({
            x: Math.abs(this.x() - v.x()),
            y: Math.abs(this.y() - v.y()),
            z: Math.abs(this.z() - v.z()),
        });
        return new VectorConstValue({x: this.x() - v.x(), y: this.y() - v.y(), z: this.z() - v.z()});
    }

    /**
     * Возвращает true, если объекты идентичны
     * @param {VectorValue|VectorConstValue} v - вектор
     * @return {boolean}
     */
    public equals(v: VectorConstValue | VectorValue): boolean {
        return this.x() === v.x() && this.y() === v.y();
    }

    /**
     * Создает постоянные векторные значения
     * @return {VectorConstValue}
     */
    public getConstValue(): VectorConstValue {
        return new VectorConstValue({x: this.x(), y: this.y(), z: this.z()});
    }

}

/**
 * @typedef {Object} IVectorValueProps
 * @property {number} [x = 0]
 * @property {number} [y = 0]
 * @property {number} [z = 0]
 */
