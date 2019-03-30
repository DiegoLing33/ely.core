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
 * Файл: ContextElement.ts                                                    *
 * Файл изменен: 30.03.2019 00:24:41                                          *
 *                                                                            *
 ******************************************************************************/

import {RectConst} from "../..";
import Rect from "../../geometry/Rect";

/**
 * Элемент контекста
 * @class ContextElement
 */
export default class ContextElement {

    /**
     * Свойство: угол поворота объекта
     * @ignore
     * @protected
     */
    protected __angle: number | null;

    /**
     * Свойство: прямоугольник
     * @ignore
     * @protected
     */
    protected __rect: Rect;

    /**
     * Свойство: фильтр объекта
     * @ignore
     * @protected
     */
    protected __filter: string | null;

    /**
     * Конструктор
     * @param {{ rect: RectConst, angle?: number, filter?: string }} props - параметры
     */
    public constructor(props: { rect: RectConst, angle?: number, filter?: string }) {
        this.__rect = props.rect.getRect();
        this.__angle = props.angle || null;
        this.__filter = props.filter || null;
    }

    /**
     * Возвращает угол поворота объекта
     * @return {number}
     */
    public angle(): number;

    /**
     * Устанавливает угол поворота объекта
     * @param {number} value - значение
     * @return {this}
     */
    public angle(value: number): ContextElement;

    /**
     * Возвращает и устанавливает угол поворота объекта
     * @param {number} [value] - значение
     * @returns {number|this|null}
     */
    public angle(value?: number): number | null | ContextElement {
        if (value === undefined) return this.__angle;
        this.__angle = value;
        return this;
    }

    /**
     * Возвращает прямоугольник
     * @return {Rect}
     */
    public rect(): Rect {
        return this.__rect;
    }

    /**
     * Возвращает фильтр объекта
     * @return {string}
     */
    public filter(): string;

    /**
     * Устанавливает фильтр объекта
     * @param {string} value - значение
     * @return {this}
     */
    public filter(value: string): ContextElement;

    /**
     * Возвращает и устанавливает фильтр объекта
     * @param {string} [value] - значение
     * @returns {string|this|null}
     */
    public filter(value?: string): string | null | ContextElement {
        if (value === undefined) return this.__filter;
        this.__filter = value;
        return this;
    }
}
