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

import {variable} from "../utils/Guard";

/**
 * Опции объектов: {@link SizeConstValue} {@link SizeValue}
 */
export interface ISizeValueProps {
    /**
     * Ширина
     */
    width?: number;

    /**
     * Высота
     */
    height?: number;

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
     * Конструктор
     * @param {ISizeValueProps} props
     * @constructor
     */
    public constructor(props: ISizeValueProps = {}) {
        if (props.d) {
            this.__height = this.__width = 0;
        } else {
            this.__height = props.height || 0;
            this.__width = props.width || 0;
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
     * Создает значения
     * @return {SizeValue}
     */
    public getValue(): SizeValue {
        return new SizeValue({width: this.width(), height: this.height()});
    }

}

/**
 * Размер
 * @class {SizeValue}
 */
export default class SizeValue extends SizeConstValue {

    /**
     * Возвращает сумму размеров
     * @param {...SizeConstValue} s
     * @return {SizeConstValue}
     */
    public static getSum(...s: Array<SizeValue | SizeConstValue>): SizeConstValue {
        const size = new SizeValue();
        s.forEach(sz => size.add({s: sz}));
        return size.getConstValue();
    }

    protected __width: number = 0;
    protected __height: number = 0;

    /**
     * Конструктор
     * @param {ISizeValueProps} props
     * @constructor
     */
    public constructor(props: ISizeValueProps = {}) {
        super(props);
    }

    /**
     * Устанавливает размер по диагонали
     * @param {number} d - значение диагонали
     */
    public setDiagonal(d: number): SizeValue {
        this.width(d);
        this.height(d);
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
     * Прибавляет значение к размеру
     * @param {{ width?: number, height?: number, s: SizeConstValue | SizeValue}} props - значения
     * @return {SizeValue}
     */
    public add(props: { width?: number, height?: number, s: SizeConstValue | SizeValue }): SizeValue {
        if (props.s) {
            this.width(this.height() + props.s.width());
            this.height(this.height() + props.s.height());
        } else {
            this.width(this.width() + (props.width || 0));
            this.height(this.height() + (props.height || 0));
        }
        return this;
    }

    /**
     * Умножает размеры и значения
     * @param {{ width?: number, height?: number, s: SizeConstValue | SizeValue}} props - значения
     * @return {SizeValue}
     */
    public mul(props: { width?: number, height?: number, s?: SizeValue | SizeConstValue } = {}): SizeValue {
        if (props.s) {
            this.width(this.width() * props.s.width());
            this.height(this.height() * props.s.height());
        } else {
            variable<number>(props.width, v => this.width(this.width() * v));
            variable<number>(props.height, v => this.height(this.height() * v));
        }
        return this;
    }

    /**
     * Делит размеры и значения
     * @param {{ width?: number, height?: number, s: SizeConstValue | SizeValue}} props - значения
     * @return {SizeValue}
     */
    public subdivide(props: { width?: number, height?: number, s?: SizeValue | SizeConstValue } = {}): SizeValue {
        if (props.s) {
            this.width(this.width() / props.s.width());
            this.height(this.height() / props.s.height());
        } else {
            variable<number>(props.width, v => this.width(this.width() / v));
            variable<number>(props.height, v => this.height(this.height() / v));
        }
        return this;
    }

    /**
     * Возвращает константный объект разницы
     * @param {VectorValue|VectorConstValue} s - вектор сравнения
     * @param {boolean} [abs = false] - абсолютные значения
     * @return {SizeConstValue}
     */
    public getDiffs(s: SizeValue | SizeConstValue, abs: boolean = false): SizeConstValue {
        if (abs) return new SizeConstValue({
            height: Math.abs(this.height() - s.height()),
            width: Math.abs(this.width() - s.width()),
        });
        return new SizeConstValue({width: this.width() - s.width(), height: this.height() - s.height()});
    }

    /**
     * Возвращает true, если объекты идентичны
     * @param {SizeConstValue|SizeValue} s - вектор
     * @return {boolean}
     */
    public equals(s: SizeValue | SizeConstValue): boolean {
        return this.width() === s.width() && this.height() === s.height();
    }

    /**
     * Создает постоянные значения
     * @return {SizeConstValue}
     */
    public getConstValue(): SizeConstValue {
        return new SizeConstValue({width: this.width(), height: this.height()});
    }
}

/**
 * @typedef {Object} ISizeValueProps
 * @property {number} [width = 0] - ширина
 * @property {number} [height = 0] - высота
 * @property {number} [d = 0] - диагональ
 */
