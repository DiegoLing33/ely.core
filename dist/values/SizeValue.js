"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const Guard_1 = require("../utils/Guard");
/**
 * Неизменяемый размер
 * @class {SizeConstValue}
 */
class SizeConstValue {
    /**
     * Конструктор
     * @param {ISizeConstValueProps} props
     * @constructor
     */
    constructor(props = {}) {
        /**
         * @ignore
         * @protected
         */
        this.__width = 0;
        /**
         * @ignore
         * @protected
         */
        this.__height = 0;
        /**
         * @ignore
         * @protected
         */
        this.__depth = 0;
        if (props.d) {
            this.__height = this.__width = this.__depth = props.d;
        }
        else {
            this.__height = props.height || 0;
            this.__width = props.width || 0;
            this.__depth = props.depth || 0;
        }
    }
    /**
     * Создаёт нулевой объект
     * @return {SizeConstValue}
     */
    static zero() {
        return new SizeConstValue({ width: 0, height: 0 });
    }
    /**
     * Возвращает значение ширины
     * @return {number}
     */
    width() {
        return this.__width;
    }
    /**
     * Возвращает значение высоты
     * @return {number}
     */
    height() {
        return this.__height;
    }
    /**
     * Возвращает значение глубины
     * @return {number}
     */
    depth() {
        return this.__depth;
    }
    /**
     * Создает значения
     * @return {SizeValue}
     */
    getValue() {
        return new SizeValue({ width: this.width(), height: this.height(), depth: this.depth() });
    }
}
exports.SizeConstValue = SizeConstValue;
/**
 * Размер
 * @class {SizeValue}
 */
class SizeValue extends SizeConstValue {
    /**
     * Создаёт нулевой объект
     * @return {SizeValue}
     */
    static zero() {
        return new SizeValue({ width: 0, height: 0, depth: 0 });
    }
    /**
     * Возвращает сумму размеров
     * @param {...SizeConstValue} s
     * @return {SizeConstValue}
     */
    static getSum(...s) {
        const size = new SizeValue();
        s.forEach(sz => size.add({ s: sz }));
        return size.getConstValue();
    }
    /**
     * Конструктор
     * @param {ISizeConstValueProps} props
     * @constructor
     */
    constructor(props = {}) {
        super(props);
    }
    /**
     * Устанавливает размер по диагонали
     * @param {number} d - значение диагонали
     */
    setDiagonal(d) {
        this.width(d);
        this.height(d);
        this.depth(d);
        return this;
    }
    /**
     * Возвращает и устанавливает значение ширины
     * @param {number} [value] - значение
     * @returns {number|this|null}
     */
    width(value) {
        if (value === undefined)
            return this.__width;
        this.__width = value;
        return this;
    }
    /**
     * Возвращает и устанавливает значение высоты
     * @param {number} [value] - значение
     * @returns {number|this|null}
     */
    height(value) {
        if (value === undefined)
            return this.__height;
        this.__height = value;
        return this;
    }
    /**
     * Возвращает и устанавливает значение глубины
     * @param {number} [value] - значение
     * @returns {number|this|null}
     */
    depth(value) {
        if (value === undefined)
            return this.__depth;
        this.__depth = value;
        return this;
    }
    /**
     * Прибавляет значение к размеру
     * @param {{ width?: number, height?: number, depth?: number, s: SizeConstValue}} props - значения
     * @return {SizeValue}
     */
    add(props) {
        if (props.s) {
            this.width(this.height() + props.s.width());
            this.height(this.height() + props.s.height());
            this.depth(this.depth() + props.s.depth());
        }
        else {
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
    mul(props = {}) {
        if (props.s) {
            this.width(this.width() * props.s.width());
            this.height(this.height() * props.s.height());
            this.depth(this.depth() * props.s.depth());
        }
        else {
            Guard_1.default.variable(props.width, v => this.width(this.width() * v));
            Guard_1.default.variable(props.height, v => this.height(this.height() * v));
            Guard_1.default.variable(props.depth, v => this.depth(this.depth() * v));
        }
        return this;
    }
    /**
     * Делит размеры и значения
     * @param {{ width?: number, height?: number, depth?: number, s: SizeConstValue}} props - значения
     * @return {SizeValue}
     */
    subdivide(props = {}) {
        if (props.s) {
            this.width(this.width() / props.s.width());
            this.height(this.height() / props.s.height());
            this.depth(this.depth() / props.s.depth());
        }
        else {
            Guard_1.default.variable(props.width, v => this.width(this.width() / v));
            Guard_1.default.variable(props.height, v => this.height(this.height() / v));
            Guard_1.default.variable(props.depth, v => this.depth(this.depth() / v));
        }
        return this;
    }
    /**
     * Возвращает константный объект разницы
     * @param {SizeConstValue} s - вектор сравнения
     * @param {boolean} [abs = false] - абсолютные значения
     * @return {SizeConstValue}
     */
    getDiffs(s, abs = false) {
        if (abs)
            return new SizeConstValue({
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
    equals(s) {
        return this.width() === s.width() && this.height() === s.height() && this.depth() === s.depth();
    }
    /**
     * Создает постоянные значения
     * @return {SizeConstValue}
     */
    getConstValue() {
        return new SizeConstValue({ width: this.width(), height: this.height(), depth: this.depth() });
    }
}
exports.default = SizeValue;
/**
 * @typedef {Object} ISizeConstValueProps
 * @property {number} [width = 0] - ширина
 * @property {number} [height = 0] - высота
 * @property {number} [depth = 0] - глубина
 * @property {number} [d = 0] - диагональ
 */
