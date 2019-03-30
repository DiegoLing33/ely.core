/**
 * @interface IColorRGB
 * @property {number} red
 * @property {number} green
 * @property {number} blue
 */
/**
 * @interface IColorHSV
 * @property {number} hue
 * @property {number} saturation
 * @property {number} value
 */
/**
 * Цвет RGB
 */
export interface IColorRGB {
    red: number;
    green: number;
    blue: number;
}
/**
 * Цвет HSV
 */
export interface IColorHSV {
    hue: number;
    saturation: number;
    value: number;
}
/**
 * Утилиты для работы с цветом
 */
export declare class ColorUtils {
    /**
     * Код белого цвета
     */
    static whiteNumber: number;
    /**
     * Код черного цвета
     */
    static blackNumber: number;
    /**
     * Преобразует HSV цвет в RGB
     * @param color
     */
    static hsv2rgb(color: IColorHSV): IColorRGB;
    /**
     * Преобразует RGB цвет в HSV
     * @param color
     */
    static rgb2hsv(color: IColorRGB): IColorHSV;
    /**
     * Преобразует HSV в __hex
     * @param color
     */
    static hsv2hex(color: IColorHSV): string;
    /**
     * Преобразует HEX в RGB
     * @param hex
     */
    static hex2rgb(hex: string): IColorRGB;
    /**
     * Преобразует __hex цвет в hsv
     * @param hex
     */
    static hex2hsv(hex: string): IColorHSV;
    /**
     * Преобразует RGB в HEX
     * @param color
     */
    static rgb2hex(color: IColorRGB): string;
}
