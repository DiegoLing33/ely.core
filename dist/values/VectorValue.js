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
 * Файл: VectorValue.ts                                                     *
 * Файл изменен: 27.03.2019 19:04:31                                          *
 *                                                                            *
 ******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
const Guard_1 = require("../utils/Guard");
/**
 * Вектор с постоянными значениями
 * @class VectorConstValue
 */
class VectorConstValue {
    /**
     * Конструктор
     * @param {IVectorValueProps} [props = {}]
     */
    constructor(props = {}) {
        /**
         * @ignore
         * @protected
         */
        this.__x = 0;
        /**
         * @ignore
         * @protected
         */
        this.__y = 0;
        /**
         * @ignore
         * @protected
         */
        this.__z = 0;
        this.__x = props.x || 0;
        this.__y = props.y || 0;
        this.__z = props.z || 0;
    }
    /**
     * Возвращает значение по оси X
     * @return {number}
     */
    x() {
        return this.__x;
    }
    /**
     * Возвращает значение по оси Y
     * @return {number}
     */
    y() {
        return this.__y;
    }
    /**
     * Возвращает значение по оси Z
     * @return {number}
     */
    z() {
        return this.__z;
    }
    /**
     * Создает векторные значения
     * @return {VectorValue}
     */
    getValue() {
        return new VectorValue({ x: this.x(), y: this.y(), z: this.z() });
    }
}
exports.VectorConstValue = VectorConstValue;
/**
 * Значения вектора
 * @class VectorValue
 */
class VectorValue extends VectorConstValue {
    /**
     * Возвращает сумму векторов
     * @param {...VectorConstValue} v
     * @return {VectorConstValue}
     */
    static getSum(...v) {
        const vec = new VectorValue();
        v.forEach(vc => vec.add({ v: vc }));
        return vec.getConstValue();
    }
    /**
     * Конструктор
     * @param {IVectorValueProps} [props = {}]
     */
    constructor(props = {}) {
        super(props);
    }
    /**
     * Возвращает и устанавливает значение по оси X
     * @param {number} [value] - значение
     * @returns {number|this|null}
     */
    x(value) {
        if (value === undefined)
            return this.__x;
        this.__x = value;
        return this;
    }
    /**
     * Возвращает и устанавливает значение по оси Y
     * @param {number} [value] - значение
     * @returns {number|this|null}
     */
    y(value) {
        if (value === undefined)
            return this.__y;
        this.__y = value;
        return this;
    }
    /**
     * Возвращает и устанавливает значение по оси Z
     * @param {number} [value] - значение
     * @returns {number|this|null}
     */
    z(value) {
        if (value === undefined)
            return this.__z;
        this.__z = value;
        return this;
    }
    /**
     * Прибавляет значение к вектору
     * @param {{ x?: number, y?: number, z?: number, v?: VectorValue | VectorConstValue }} props - значения
     * @return {VectorValue}
     */
    add(props = {}) {
        if (props.v) {
            this.x(this.x() + props.v.x());
            this.y(this.y() + props.v.y());
            this.z(this.z() + props.v.z());
        }
        else {
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
    mul(props = {}) {
        if (props.v) {
            this.x(this.x() * props.v.x());
            this.y(this.y() * props.v.y());
            this.z(this.z() * props.v.z());
        }
        else {
            Guard_1.variable(props.x, v => this.x(this.x() * v));
            Guard_1.variable(props.y, v => this.y(this.y() * v));
            Guard_1.variable(props.z, v => this.z(this.z() * v));
        }
        return this;
    }
    /**
     * Делит векторы и значения
     * @param {{ x?: number, y?: number, z?: number, v?: VectorValue | VectorConstValue }} props - значения
     * @return {VectorValue}
     */
    subdivide(props = {}) {
        if (props.v) {
            this.x(this.x() / props.v.x());
            this.y(this.y() / props.v.y());
            this.z(this.z() / props.v.z());
        }
        else {
            Guard_1.variable(props.x, v => this.x(this.x() / v));
            Guard_1.variable(props.y, v => this.y(this.y() / v));
            Guard_1.variable(props.z, v => this.z(this.z() / v));
        }
        return this;
    }
    /**
     * Возвращает константный объект разницы
     * @param {VectorValue|VectorConstValue} v - вектор сравнения
     * @param {boolean} [abs = false] - абсолютные значения
     * @return {VectorConstValue}
     */
    getDiffs(v, abs = false) {
        if (abs)
            return new VectorConstValue({
                x: Math.abs(this.x() - v.x()),
                y: Math.abs(this.y() - v.y()),
                z: Math.abs(this.z() - v.z()),
            });
        return new VectorConstValue({ x: this.x() - v.x(), y: this.y() - v.y(), z: this.z() - v.z() });
    }
    /**
     * Возвращает true, если объекты идентичны
     * @param {VectorValue|VectorConstValue} v - вектор
     * @return {boolean}
     */
    equals(v) {
        return this.x() === v.x() && this.y() === v.y();
    }
    /**
     * Создает постоянные векторные значения
     * @return {VectorConstValue}
     */
    getConstValue() {
        return new VectorConstValue({ x: this.x(), y: this.y(), z: this.z() });
    }
}
exports.default = VectorValue;
/**
 * @typedef {Object} IVectorValueProps
 * @property {number} [x = 0]
 * @property {number} [y = 0]
 * @property {number} [z = 0]
 */
