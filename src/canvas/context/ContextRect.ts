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
 * Файл: ContextRect.ts                                                       *
 * Файл изменен: 27.02.2019 00:59:55                                          *
 *                                                                            *
 ******************************************************************************/

import Color from "../../color/Color";
import {RectConst} from "../../geometry/Rect";
import ContextElement from "./ContextElement";

/**
 * Прямоугольник
 * @class ContextRect
 * @augments {ContextElement}
 */
export default class ContextRect extends ContextElement {

    /**
     * Свойство: цвет обводки
     * @ignore
     * @protected
     */
    protected __strokeColor: Color | null;

    /**
     * Свойство: цвет заливки
     * @ignore
     * @protected
     */
    protected __fillColor: Color | null;

    /**
     * Свойство: толщина линии обводки
     * @ignore
     * @protected
     */
    protected __strokeWidth: number;

    /**
     * Конструктор
     * @param {{rect: RectConst, fillColor?: Color,
     * strokeColor?: Color, strokeWidth?: number, angle?: number}} props - параметры
     */
    public constructor(props: {
        rect: RectConst,
        fillColor?: Color,
        strokeColor?: Color,
        strokeWidth?: number,
        angle?: number,
    }) {
        super(props);
        this.__strokeColor = props.strokeColor || null;
        this.__fillColor = props.fillColor || null;
        this.__strokeWidth = props.strokeWidth === undefined ? 1 : props.strokeWidth;
    }

    /**
     * Возвращает цвет обводки
     * @return {Color}
     */
    public strokeColor(): Color;

    /**
     * Устанавливает цвет обводки
     * @param {Color} value - значение
     * @return {this}
     */
    public strokeColor(value: Color): ContextRect;

    /**
     * Возвращает и устанавливает цвет обводки
     * @param {Color} [value] - значение
     * @returns {Color|this|null}
     */
    public strokeColor(value?: Color): Color | null | ContextRect {
        if (value === undefined) return this.__strokeColor;
        this.__strokeColor = value;
        return this;
    }

    /**
     * Возвращает цвет заливки
     * @return {Color}
     */
    public fillColor(): Color;

    /**
     * Устанавливает цвет заливки
     * @param {Color} value - значение
     * @return {this}
     */
    public fillColor(value: Color): ContextRect;

    /**
     * Возвращает и устанавливает цвет заливки
     * @param {Color} [value] - значение
     * @returns {Color|this|null}
     */
    public fillColor(value?: Color): Color | null | ContextRect {
        if (value === undefined) return this.__fillColor;
        this.__fillColor = value;
        return this;
    }

    /**
     * Возвращает толщина линии обводки
     * @return {number}
     */
    public strokeWidth(): number;

    /**
     * Устанавливает толщина линии обводки
     * @param {number} value - значение
     * @return {this}
     */
    public strokeWidth(value: number): ContextRect;

    /**
     * Возвращает и устанавливает толщина линии обводки
     * @param {number} [value] - значение
     * @returns {number|this|null}
     */
    public strokeWidth(value?: number): number | null | ContextRect {
        if (value === undefined) return this.__strokeWidth;
        this.__strokeWidth = value;
        return this;
    }

}
