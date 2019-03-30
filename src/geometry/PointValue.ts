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
 * Файл: PointValuets                                                     *
 * Файл изменен: 27.03.2019 19:04:31                                          *
 *                                                                            *
 ******************************************************************************/

import Guard from "../utils/Guard";

/**
 * Опции объектов: {@link PointConstValue} {@link PointValue}
 */
export interface IPointConstValueProps {
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
 * Точка с постоянными значениями
 * @class PointConstValue
 */
export class PointConstValue {

    /**
     * Создаёт нулевой объект
     * @return {PointConstValue}
     */
    public static zero(): PointConstValue {
        return new PointConstValue({x: 0, y: 0, z: 0});
    }

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
     * @param {IPointConstValueProps} [props = {}]
     */
    public constructor(props: IPointConstValueProps = {}) {
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
     * Создает значения точки
     * @return {PointValue}
     */
    public getValue(): PointValue {
        return new PointValue({x: this.x(), y: this.y(), z: this.z()});
    }
}

/**
 * Значения точки
 * @class PointValue
 */
export default class PointValue extends PointConstValue {

    /**
     * Создаёт нулевой объект
     * @return {PointValue}
     */
    public static zero(): PointValue {
        return new PointValue({x: 0, y: 0, z: 0});
    }

    /**
     * Возвращает сумму значений точек
     * @param {...PointConstValue} p
     * @return {PointConstValue}
     */
    public static getSum(...p: PointConstValue[]): PointConstValue {
        const vec = new PointValue();
        p.forEach(vc => vec.add({p: vc}));
        return vec.getConstValue();
    }

    /**
     * Конструктор
     * @param {IPointConstValueProps} [props = {}]
     */
    public constructor(props: IPointConstValueProps = {}) {
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
    public x(value: number): PointValue;

    /**
     * Возвращает и устанавливает значение по оси X
     * @param {number} [value] - значение
     * @returns {number|this|null}
     */
    public x(value?: number): number | null | PointValue {
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
    public y(value: number): PointValue;

    /**
     * Возвращает и устанавливает значение по оси Y
     * @param {number} [value] - значение
     * @returns {number|this|null}
     */
    public y(value?: number): number | null | PointValue {
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
    public z(value: number): PointValue;

    /**
     * Возвращает и устанавливает значение по оси Z
     * @param {number} [value] - значение
     * @returns {number|this|null}
     */
    public z(value?: number): number | null | PointValue {
        if (value === undefined) return this.__z;
        this.__z = value;
        return this;
    }

    /**
     * Прибавляет значение к координатам точки
     * @param {{ x?: number, y?: number, z?: number, p?: PointConstValue }} props - значения
     * @return {PointValue}
     */
    public add(props: { x?: number, y?: number, z?: number, p?: PointConstValue } = {}): PointValue {
        if (props.p) {
            this.x(this.x() + props.p.x());
            this.y(this.y() + props.p.y());
            this.z(this.z() + props.p.z());
        } else {
            this.x(this.x() + (props.x || 0));
            this.x(this.y() + (props.y || 0));
            this.x(this.z() + (props.y || 0));
        }
        return this;
    }

    /**
     * Умножает координаты точки и значения
     * @param {{ x?: number, y?: number, z?: number, p?: PointConstValue }} props - значения
     * @return {PointValue}
     */
    public mul(props: { x?: number, y?: number, z?: number, p?: PointConstValue } = {}): PointValue {
        if (props.p) {
            this.x(this.x() * props.p.x());
            this.y(this.y() * props.p.y());
            this.z(this.z() * props.p.z());
        } else {
            Guard.variable<number>(props.x, v => this.x(this.x() * v));
            Guard.variable<number>(props.y, v => this.y(this.y() * v));
            Guard.variable<number>(props.z, v => this.z(this.z() * v));
        }
        return this;
    }

    /**
     * Делит координаты точки и значения
     * @param {{ x?: number, y?: number, z?: number, p?: PointConstValue }} props - значения
     * @return {PointValue}
     */
    public subdivide(props: { x?: number, y?: number, z?: number, p?: PointConstValue } = {}):
        PointValue {
        if (props.p) {
            this.x(this.x() / props.p.x());
            this.y(this.y() / props.p.y());
            this.z(this.z() / props.p.z());
        } else {
            Guard.variable<number>(props.x, v => this.x(this.x() / v));
            Guard.variable<number>(props.y, v => this.y(this.y() / v));
            Guard.variable<number>(props.z, v => this.z(this.z() / v));
        }
        return this;
    }

    /**
     * Возвращает константный объект разницы
     * @param {PointConstValue} p - точка сравнения
     * @param {boolean} [abs = false] - абсолютные значения
     * @return {PointConstValue}
     */
    public getDiffs(p: PointConstValue, abs: boolean = false): PointConstValue {
        if (abs) return new PointConstValue({
            x: Math.abs(this.x() - p.x()),
            y: Math.abs(this.y() - p.y()),
            z: Math.abs(this.z() - p.z()),
        });
        return new PointConstValue({x: this.x() - p.x(), y: this.y() - p.y(), z: this.z() - p.z()});
    }

    /**
     * Возвращает true, если объекты идентичны
     * @param {PointConstValue} p - точка
     * @return {boolean}
     */
    public equals(p: PointConstValue | PointValue): boolean {
        return this.x() === p.x() && this.y() === p.y();
    }

    /**
     * Создает постоянные значения точки
     * @return {PointConstValue}
     */
    public getConstValue(): PointConstValue {
        return new PointConstValue({x: this.x(), y: this.y(), z: this.z()});
    }

}

/**
 * @typedef {Object} IPointConstValueProps
 * @property {number} [x = 0]
 * @property {number} [y = 0]
 * @property {number} [z = 0]
 */
