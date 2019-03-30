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
 * Файл: ContextText.ts                                                       *
 * Файл изменен: 27.02.2019 00:59:55                                          *
 *                                                                            *
 ******************************************************************************/

import {PointConstValue, RectConst} from "../..";
import Color from "../../color/Color";
import SizeValue from "../../geometry/SizeValue";
import Guard from "../../utils/Guard";
import ContextElement from "./ContextElement";

/**
 * Шрифт
 * @class {ContextTextFont}
 */
export class ContextTextFont {

    /**
     * Создает стандартный шрифт
     * @return {ContextTextFont}
     */
    public static createDefault(): ContextTextFont {
        return new ContextTextFont("Arial", 14);
    }

    /**
     * Свойство: имя шрифта
     * @ignore
     * @protected
     */
    protected __name: string;

    /**
     * Свойство: размер шрифта
     * @ignore
     * @protected
     */
    protected __size: number;

    /**
     * Конструктор
     * @param {string} fontName
     * @param {number} fontSize
     */
    public constructor(fontName: string, fontSize: number) {
        this.__size = fontSize;
        this.__name = fontName;
    }

    /**
     * Возвращает имя шрифта
     * @return {string}
     */
    public name(): string;

    /**
     * Устанавливает имя шрифта
     * @param {string} value - значение
     * @return {this}
     */
    public name(value: string): ContextTextFont;

    /**
     * Возвращает и устанавливает имя шрифта
     * @param {string} [value] - значение
     * @returns {string|this|null}
     */
    public name(value?: string): string | null | ContextTextFont {
        if (value === undefined) return this.__name;
        this.__name = value;
        return this;
    }

    /**
     * Возвращает размер шрифта
     * @return {number}
     */
    public size(): number;

    /**
     * Устанавливает размер шрифта
     * @param {number} value - значение
     * @return {this}
     */
    public size(value: number): ContextTextFont;

    /**
     * Возвращает и устанавливает размер шрифта
     * @param {number} [value] - значение
     * @returns {number|this|null}
     */
    public size(value?: number): number | null | ContextTextFont {
        if (value === undefined) return this.__size;
        this.__size = value;
        return this;
    }

}

/**
 * Текст
 * @class ContextText
 */
export default class ContextText extends ContextElement {

    /**
     * Свойство: текст
     * @ignore
     * @protected
     */
    protected __text: string;

    /**
     * Свойство: цвет заливки текста
     * @ignore
     * @protected
     */
    protected __fillColor: Color | null;

    /**
     * Свойство: цвет обводки текста
     * @ignore
     * @protected
     */
    protected __strokeColor: Color | null;

    /**
     * Свойство: толщина обводки текста
     * @ignore
     * @protected
     */
    protected __strokeWidth: number;

    /**
     * Свойство: флаг текста по центру
     * @ignore
     * @protected
     */
    protected __alignCenter: boolean;

    /**
     * Свойство: значение максимальной длины текста в пикселях
     * @ignore
     * @protected
     */
    protected __maxWidth: number | null;

    /**
     * Свойство: промежуток между линиями текста
     * @ignore
     * @protected
     */
    protected __lineSpacing: number = 5;

    /**
     * Свойство: шрифт текста
     * @ignore
     * @protected
     */
    protected __font: ContextTextFont = ContextTextFont.createDefault();

    /**
     * Конструктор
     * @param {{ text: string, vector: PointConstValue, font?: { size: number, fontName: string },
     * fillColor?: Color, strokeColor?: Color, strokeWidth?: number, alignCenter?: number, maxWidth?: number,
     * lineSpacing?: number }} props
     */
    public constructor(props: {
        text: string, vector: PointConstValue, font?: ContextTextFont,
        fillColor?: Color, strokeColor?: Color, strokeWidth?: number, alignCenter?: boolean, maxWidth?: number,
        lineSpacing?: number,
    }) {
        super({...props, rect: new RectConst({position: props.vector, size: SizeValue.zero()})});
        this.__text = props.text;
        this.__fillColor = props.fillColor || null;
        this.__strokeColor = props.strokeColor || null;
        this.__strokeWidth = props.strokeWidth === undefined ? 1 : props.strokeWidth;
        this.__alignCenter = props.alignCenter || false;
        this.__maxWidth = props.maxWidth || null;
        this.__lineSpacing = props.lineSpacing === undefined ? 5 : props.lineSpacing;
        Guard.variable<ContextTextFont>(props.font, v => this.__font = v);
    }

    /**
     * Возвращает текст
     * @return {string}
     */
    public text(): string;

    /**
     * Устанавливает текст
     * @param {string} value - значение
     * @return {this}
     */
    public text(value: string): ContextText;

    /**
     * Возвращает и устанавливает текст
     * @param {string} [value] - значение
     * @returns {string|this|null}
     */
    public text(value?: string): string | null | ContextText {
        if (value === undefined) return this.__text;
        this.__text = value;
        return this;
    }

    /**
     * Возвращает шрифт текста
     * @return {ContextTextFont}
     */
    public font(): ContextTextFont {
        return this.__font;
    }

    /**
     * Возвращает цвет заливки текста
     * @return {Color}
     */
    public fillColor(): Color;

    /**
     * Устанавливает цвет заливки текста
     * @param {Color} value - значение
     * @return {this}
     */
    public fillColor(value: Color): ContextText;

    /**
     * Возвращает и устанавливает цвет заливки текста
     * @param {Color} [value] - значение
     * @returns {Color|this|null}
     */
    public fillColor(value?: Color): Color | null | ContextText {
        if (value === undefined) return this.__fillColor;
        this.__fillColor = value;
        return this;
    }

    /**
     * Возвращает цвет обводки текста
     * @return {Color}
     */
    public strokeColor(): Color;

    /**
     * Устанавливает цвет обводки текста
     * @param {Color} value - значение
     * @return {this}
     */
    public strokeColor(value: Color): ContextText;

    /**
     * Возвращает и устанавливает цвет обводки текста
     * @param {Color} [value] - значение
     * @returns {Color|this|null}
     */
    public strokeColor(value?: Color): Color | null | ContextText {
        if (value === undefined) return this.__strokeColor;
        this.__strokeColor = value;
        return this;
    }

    /**
     * Возвращает толщина обводки текста
     * @return {number}
     */
    public strokeWidth(): number;

    /**
     * Устанавливает толщина обводки текста
     * @param {number} value - значение
     * @return {this}
     */
    public strokeWidth(value: number): ContextText;

    /**
     * Возвращает и устанавливает толщина обводки текста
     * @param {number} [value] - значение
     * @returns {number|this|null}
     */
    public strokeWidth(value?: number): number | null | ContextText {
        if (value === undefined) return this.__strokeWidth;
        this.__strokeWidth = value;
        return this;
    }

    /**
     * Возвращает флаг текста по центру
     * @return {boolean}
     */
    public alignCenter(): boolean;

    /**
     * Устанавливает флаг текста по центру
     * @param {boolean} value - значение
     * @return {this}
     */
    public alignCenter(value: boolean): ContextText;

    /**
     * Возвращает и устанавливает флаг текста по центру
     * @param {boolean} [value] - значение
     * @returns {boolean|this|null}
     */
    public alignCenter(value?: boolean): boolean | null | ContextText {
        if (value === undefined) return this.__alignCenter;
        this.__alignCenter = value;
        return this;
    }

    /**
     * Возвращает значение максимальной длины текста в пикселях
     * @return {number}
     */
    public maxWidth(): number;

    /**
     * Устанавливает значение максимальной длины текста в пикселях
     * @param {number} value - значение
     * @return {this}
     */
    public maxWidth(value: number): ContextText;

    /**
     * Возвращает и устанавливает значение максимальной длины текста в пикселях
     * @param {number} [value] - значение
     * @returns {number|this|null}
     */
    public maxWidth(value?: number): number | null | ContextText {
        if (value === undefined) return this.__maxWidth;
        this.__maxWidth = value;
        return this;
    }

    /**
     * Возвращает промежуток между линиями текста
     * @return {number}
     */
    public lineSpacing(): number;

    /**
     * Устанавливает промежуток между линиями текста
     * @param {number} value - значение
     * @return {this}
     */
    public lineSpacing(value: number): ContextText;

    /**
     * Возвращает и устанавливает промежуток между линиями текста
     * @param {number} [value] - значение
     * @returns {number|this|null}
     */
    public lineSpacing(value?: number): number | null | ContextText {
        if (value === undefined) return this.__lineSpacing;
        this.__lineSpacing = value;
        return this;
    }
}
