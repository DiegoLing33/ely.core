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
 * Файл: Rect.ts                                                              *
 * Файл изменен: 30.03.2019 21:45:57                                          *
 *                                                                            *
 ******************************************************************************/
import Guard from "../utils/Guard";
import PointValue, {PointConstValue} from "./PointValue";
import SizeValue, {SizeConstValue} from "./SizeValue";

export interface IRectOptions {
    size?: SizeConstValue;
    position?: PointConstValue;
}

/**
 * Постоянный прямоугольник
 * @class RectConst
 */
export class RectConst {

    /**
     * Положение прямоугольника
     * @protected
     * @ignore
     */
    protected __position: PointValue = PointValue.zero();

    /**
     * Размер прямоугольника
     * @protected
     * @ignore
     */
    protected __size: SizeValue = SizeValue.zero();

    /**
     * Конструктор
     * @param {IRectOptions} [options]
     */
    public constructor(options: IRectOptions = {}) {
        Guard.variable<PointConstValue>(options.position, v => this.__position = v.getValue());
        Guard.variable<SizeConstValue>(options.size, v => this.__size = v.getValue());
    }

    /**
     * Возвращает размер прямоугольника
     * @return {SizeConstValue}
     */
    public size(): SizeConstValue {
        return this.__size.getConstValue();
    }

    /**
     * Возвращает позицию прямоугольника
     * @return {PointConstValue}
     */
    public position(): PointConstValue {
        return this.__position.getConstValue();
    }

    /**
     * Расчитывает вторую позицию (нижний правый угол)
     * @return {PointConstValue}
     */
    public getSecondPosition(): PointConstValue {
        return new PointConstValue({
            x: this.position().x() + this.size().width(),
            y: this.position().y() + this.size().height(),
            z: this.position().z() + this.size().depth(),
        });
    }

    /**
     * Создает и возвращает прямоугольник
     * @return {Rect}
     */
    public getRect(): Rect {
        return new Rect({position: this.position(), size: this.size()});
    }
}

/**
 * Прямоугольник
 * @class Rect
 */
export default class Rect extends RectConst {

    /**
     * Конструктор
     * @param {IRectOptions} options
     */
    public constructor(options: IRectOptions = {}) {
        super(options);
    }

    /**
     * Возвращает размер прямоугольника
     * @return {SizeValue}
     */
    public size(): SizeValue;

    /**
     * Устанавливает размер прямоугольника
     * @param {SizeValue} value - значение
     * @return {this}
     */
    public size(value: SizeValue): Rect;

    /**
     * Возвращает и устанавливает размер прямоугольника
     * @param {SizeValue} [value] - значение
     * @returns {SizeValue|this|null}
     */
    public size(value?: SizeValue): SizeValue | null | Rect {
        if (value === undefined) return this.__size;
        this.__size = value;
        return this;
    }

    /**
     * Возвращает координаты прямоугольника
     * @return {PointValue}
     */
    public position(): PointValue;

    /**
     * Устанавливает координаты прямоугольника
     * @param {PointValue} value - значение
     * @return {this}
     */
    public position(value: PointValue): Rect;

    /**
     * Возвращает и устанавливает координаты прямоугольника
     * @param {PointValue} [value] - значение
     * @returns {PointValue|this|null}
     */
    public position(value?: PointValue): PointValue | null | Rect {
        if (value === undefined) return this.__position;
        this.__position = value;
        return this;
    }

    /**
     * Создает и вовзращает прямоугольник с постоянными значениями
     * @return {RectConst}
     */
    public getConst(): RectConst {
        return new RectConst({size: this.size(), position: this.position()});
    }
}

/**
 * @typedef {Object} IRectOptions
 * @property {SizeConstValue} [size]
 * @property {PointConstValue} [vector]
 */
