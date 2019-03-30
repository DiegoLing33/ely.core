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
 * Файл: Color.ts                                                             *
 * Файл изменен: 27.02.2019 01:00:30                                          *
 *                                                                            *
 ******************************************************************************/
import { IColorHSV, IColorRGB } from "./ColorUtils";
/**
 * Цвет
 * @class Color
 */
export default class Color {
    /**
     * Возвращает черный цвет
     * @return {Color}
     */
    static black(): Color;
    /**
     * Возвращает белый цвет
     * @return {Color}
     */
    static white(): Color;
    /**
     * Возвращает красный цвет
     * @return {Color}
     */
    static red(): Color;
    /**
     * Возвращает зеленый цвет
     * @return {Color}
     */
    static green(): Color;
    /**
     * Возвращает синий цвет
     * @return {Color}
     */
    static blue(): Color;
    /**
     * Десериализует объект
     * @param {string} raw - сериализованный объект
     * @return {Color}
     */
    static deserialize(raw: string): Color | null;
    /**
     * 16 код цвета
     * @protected
     * @type {string}
     */
    protected __hex: string;
    /**
     * Конструктор
     * @param {{ __hex?: string, rgb?: IColorRGB, hsv?: IColorHSV }} props - параметры
     */
    constructor(props?: {
        hex?: string;
        rgb?: IColorRGB;
        hsv?: IColorHSV;
    });
    /**
     * Возвращает число цвета
     * @return {number}
     */
    getByte(): number;
    /**
     * Возвращает true, если цвет темный
     * @return {boolean}
     */
    isDarker(): boolean;
    /**
     * Возвращает байты цветов
     * @return {IColorRGB}
     */
    getRGBBytes(): IColorRGB;
    /**
     * Устанавливает RGB цвета
     *
     * @param {{IColorRGB}} props
     */
    setRGBBytes(props: {
        rgb: IColorRGB;
    }): void;
    /**
     * Возвращает цвет светлее
     * @param {number} percentage
     * @return {Color}
     */
    getLighterColor(percentage: number): Color;
    /**
     * Возвращает цвет тмнее
     * @param {number} percentage
     * @return {Color}
     */
    getDarkerColor(percentage: number): Color;
    /**
     * Возвращает HEX с символом # в начале
     * @return {string}
     */
    getHexString(): string;
    /**
     * Возвращает HEX с символом # в начале
     * @return {string}
     */
    toString(): string;
}
