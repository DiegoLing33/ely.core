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
 * Файл: Sphere.ts                                                            *
 * Файл изменен: 30.03.2019 22:34:13                                          *
 *                                                                            *
 ******************************************************************************/

import Guard from "../utils/Guard";
import PointValue, {PointConstValue} from "./PointValue";

/**
 * Опции круга
 */
export interface ISphereOptions {
    position?: PointConstValue;
    radius?: number;
}

/**
 * Окружность с постоянными значениями
 * @class SphereConst
 */
export class SphereConst {

    /**
     * Создает нулевой объект
     * @return {SphereConst}
     */
    public static zero(): SphereConst {
        return new SphereConst();
    }

    /**
     * Позиция
     * @ignore
     */
    protected __position: PointValue = PointValue.zero();

    /**
     * Радиус
     * @ignore
     */
    protected __radius: number = 0;

    /**
     * Конструктор
     * @param {ISphereOptions} [options]
     */
    public constructor(options: ISphereOptions = {}) {
        Guard.variable<PointConstValue>(options.position, v => this.__position = v.getValue());
        Guard.variable<number>(options.radius, v => this.__radius = v);
    }

    /**
     * Возвращает радиус
     * @return {number}
     */
    public radius(): number {
        return this.__radius;
    }

    /**
     * Возвращает позицию центра окружности
     * @return {PointConstValue}
     */
    public position(): PointConstValue {
        return this.__position.getConstValue();
    }
}

/**
 * Окружность
 * @class Sphere
 */
export default class Sphere extends SphereConst {

    /**
     * Создает нулевой объект
     * @return {Sphere}
     */
    public static zero(): Sphere {
        return new Sphere();
    }

    /**
     * Конструктор
     * @param options
     */
    public constructor(options: ISphereOptions = {}) {
        super(options);
    }

    /**
     * Возвращает радиус окружности
     * @return {number}
     */
    public radius(): number;

    /**
     * Устанавливает радиус окружности
     * @param {number} value - значение
     * @return {this}
     */
    public radius(value: number): Sphere;

    /**
     * Возвращает и устанавливает радиус окружности
     * @param {number} [value] - значение
     * @returns {number|this|null}
     */
    public radius(value?: number): number | null | Sphere {
        if (value === undefined) return this.__radius;
        this.__radius = value;
        return this;
    }

    /**
     * Возвращает положение центра окружности
     * @return {PointValue}
     */
    public position(): PointValue;

    /**
     * Устанавливает положение центра окружности
     * @param {PointValue} value - значение
     * @return {this}
     */
    public position(value: PointValue): Sphere;

    /**
     * Возвращает и устанавливает положение центра окружности
     * @param {PointValue} [value] - значение
     * @returns {PointValue|this|null}
     */
    public position(value?: PointValue): PointValue | null | Sphere {
        if (value === undefined) return this.__position;
        this.__position = value;
        return this;
    }

}

/**
 * @typedef {Object} ISphereOptions
 * @property {PointConstValue} [position]
 * @property {number} [radius]
 */
