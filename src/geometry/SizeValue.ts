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

import Guard from "../utils/Guard";

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
export class SizeConstValue {

    /**
     * Создаёт нулевой объект
     * @return {SizeConstValue}
     */
    public static zero(): SizeConstValue {
        return new SizeConstValue({width: 0, height: 0});
    }

    /**
     * @ignore
     * @protected
     */
    protected __width: number = 0;

    /**
     * @ignore
     * @protected
     */
    protected __height: number = 0;

    /**
     * @ignore
     * @protected
     */
    protected __depth: number = 0;

    /**
     * Конструктор
     * @param {ISizeConstValueProps} props
     * @constructor
     */
    public constructor(props: ISizeConstValueProps = {}) {
        if (props.d) {
            this.__height = this.__width = this.__depth = props.d;
        } else {
            this.__height = props.height || 0;
            this.__width = props.width || 0;
            this.__depth = props.depth || 0;
        }
    }

    /**
     * Возвращает значение ширины
     * @return {number}
     */
    public width(): number {
        return this.__width;
    }

    /**
     * Возвращает значение высоты
     * @return {number}
     */
    public height(): number {
        return this.__height;
    }

    /**
     * Возвращает значение глубины
     * @return {number}
     */
    public depth(): number {
        return this.__depth;
    }

    /**
     * Создает значения
     * @return {SizeValue}
     */
    public getValue(): SizeValue {
        return new SizeValue({width: this.width(), height: this.height(), depth: this.depth()});
    }

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
    public static zero(): SizeValue {
        return new SizeValue({width: 0, height: 0, depth: 0});
    }

    /**
     * Возвращает сумму размеров
     * @param {...SizeConstValue} s
     * @return {SizeConstValue}
     */
    public static getSum(...s: SizeConstValue[]): SizeConstValue {
        const size = new SizeValue();
        s.forEach(sz => size.add({s: sz}));
        return size.getConstValue();
    }

    /**
     * Конструктор
     * @param {ISizeConstValueProps} props
     * @constructor
     */
    public constructor(props: ISizeConstValueProps = {}) {
        super(props);
    }

    /**
     * Устанавливает размер по диагонали
     * @param {number} d - значение диагонали
     */
    public setDiagonal(d: number): SizeValue {
        this.width(d);
        this.height(d);
        this.depth(d);
        return this;
    }

    /**
     * Возвращает значение ширины
     * @return {number}
     */
    public width(): number;

    /**
     * Устанавливает значение ширины
     * @param {number} value - значение
     * @return {this}
     */
    public width(value: number): SizeValue;

    /**
     * Возвращает и устанавливает значение ширины
     * @param {number} [value] - значение
     * @returns {number|this|null}
     */
    public width(value?: number): number | null | SizeValue {
        if (value === undefined) return this.__width;
        this.__width = value;
        return this;
    }

    /**
     * Возвращает значение высоты
     * @return {number}
     */
    public height(): number;

    /**
     * Устанавливает значение высоты
     * @param {number} value - значение
     * @return {this}
     */
    public height(value: number): SizeValue;

    /**
     * Возвращает и устанавливает значение высоты
     * @param {number} [value] - значение
     * @returns {number|this|null}
     */
    public height(value?: number): number | null | SizeValue {
        if (value === undefined) return this.__height;
        this.__height = value;
        return this;
    }

    /**
     * Возвращает значение глубины
     * @return {number}
     */
    public depth(): number;

    /**
     * Устанавливает значение глубины
     * @param {number} value - значение
     * @return {this}
     */
    public depth(value: number): SizeValue;

    /**
     * Возвращает и устанавливает значение глубины
     * @param {number} [value] - значение
     * @returns {number|this|null}
     */
    public depth(value?: number): number | null | SizeValue {
        if (value === undefined) return this.__depth;
        this.__depth = value;
        return this;
    }

    /**
     * Прибавляет значение к размеру
     * @param {{ width?: number, height?: number, depth?: number, s: SizeConstValue}} props - значения
     * @return {SizeValue}
     */
    public add(props: { width?: number, height?: number, depth?: number, s: SizeConstValue }): SizeValue {
        if (props.s) {
            this.width(this.height() + props.s.width());
            this.height(this.height() + props.s.height());
            this.depth(this.depth() + props.s.depth());
        } else {
            this.width(this.width() + (props.width || 0));
            this.height(this.height() + (props.height || 0));
            this.depth(this.depth() + (props.depth || 0));
        }
        return this;
    }

    /**
     * Умножает размеры и значения
     * @param {{ width?: number, height?: number, depth?: number, s: SizeConstValue}} props - значения
     * @return {SizeValue}
     */
    public mul(props: { width?: number, height?: number, depth?: number, s?: SizeConstValue } = {}): SizeValue {
        if (props.s) {
            this.width(this.width() * props.s.width());
            this.height(this.height() * props.s.height());
            this.depth(this.depth() * props.s.depth());
        } else {
            Guard.variable<number>(props.width, v => this.width(this.width() * v));
            Guard.variable<number>(props.height, v => this.height(this.height() * v));
            Guard.variable<number>(props.depth, v => this.depth(this.depth() * v));
        }
        return this;
    }

    /**
     * Делит размеры и значения
     * @param {{ width?: number, height?: number, depth?: number, s: SizeConstValue}} props - значения
     * @return {SizeValue}
     */
    public subdivide(props: { width?: number, height?: number, depth?: number, s?: SizeConstValue } = {}): SizeValue {
        if (props.s) {
            this.width(this.width() / props.s.width());
            this.height(this.height() / props.s.height());
            this.depth(this.depth() / props.s.depth());
        } else {
            Guard.variable<number>(props.width, v => this.width(this.width() / v));
            Guard.variable<number>(props.height, v => this.height(this.height() / v));
            Guard.variable<number>(props.depth, v => this.depth(this.depth() / v));
        }
        return this;
    }

    /**
     * Возвращает константный объект разницы
     * @param {SizeConstValue} s - вектор сравнения
     * @param {boolean} [abs = false] - абсолютные значения
     * @return {SizeConstValue}
     */
    public getDiffs(s: SizeConstValue, abs: boolean = false): SizeConstValue {
        if (abs) return new SizeConstValue({
            depth: Math.abs(this.depth() - s.depth()),
            height: Math.abs(this.height() - s.height()),
            width: Math.abs(this.width() - s.width()),
        });
        return new SizeConstValue({
            depth: this.depth() - s.depth(), height: this.height() - s.height(), width: this.width() - s.width(),
        });
    }

    /**
     * Возвращает true, если объекты идентичны
     * @param {SizeConstValue} s - вектор
     * @return {boolean}
     */
    public equals(s: SizeConstValue): boolean {
        return this.width() === s.width() && this.height() === s.height() && this.depth() === s.depth();
    }

    /**
     * Создает постоянные значения
     * @return {SizeConstValue}
     */
    public getConstValue(): SizeConstValue {
        return new SizeConstValue({width: this.width(), height: this.height(), depth: this.depth()});
    }
}

/**
 * @typedef {Object} ISizeConstValueProps
 * @property {number} [width = 0] - ширина
 * @property {number} [height = 0] - высота
 * @property {number} [depth = 0] - глубина
 * @property {number} [d = 0] - диагональ
 */
