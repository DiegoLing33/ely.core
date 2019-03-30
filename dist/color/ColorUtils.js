"use strict";
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 +                                                                            +
 + ,--. o                   |    o                                            +
 + |   |.,---.,---.,---.    |    .,---.,---.                                  +
 + |   |||---'|   ||   |    |    ||   ||   |                                  +
 + `--' ``---'`---|`---'    `---'``   '`---|                                  +
 +            `---'                    `---'                                  +
 +                                                                            +
 + Copyright (C) 2016-2019, Yakov Panov (Yakov Ling)                          +
 + Mail: <diegoling33@gmail.com>                                              +
 +                                                                            +
 + Это программное обеспечение имеет лицензию, как это сказано в файле        +
 + COPYING, который Вы должны были получить в рамках распространения ПО.      +
 +                                                                            +
 + Использование, изменение, копирование, распространение, обмен/продажа      +
 + могут выполняться исключительно в согласии с условиями файла COPYING.      +
 +                                                                            +
 + Проект: ely.flat                                                           +
 +                                                                            +
 + Файл: ColorUtils.ts                                                        +
 + Файл изменен: 06.01.2019 05:32:41                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Утилиты для работы с цветом
 */
class ColorUtils {
    /**
     * Преобразует HSV цвет в RGB
     * @param color
     */
    static hsv2rgb(color) {
        let red = 0;
        let green = 0;
        let blue = 0;
        const i = Math.floor(color.hue * 6);
        const f = color.hue * 6 - i;
        const p = color.value * (1 - color.saturation);
        const q = color.value * (1 - f * color.saturation);
        const t = color.value * (1 - (1 - f) * color.saturation);
        switch (i % 6) {
            case 0:
                red = color.value;
                green = t;
                blue = p;
                break;
            case 1:
                red = q;
                green = color.value;
                blue = p;
                break;
            case 2:
                red = p;
                green = color.value;
                blue = t;
                break;
            case 3:
                red = p;
                green = q;
                blue = color.value;
                break;
            case 4:
                red = t;
                green = p;
                blue = color.value;
                break;
            case 5:
                red = color.value;
                green = p;
                blue = q;
                break;
        }
        return { red, green, blue };
    }
    /**
     * Преобразует RGB цвет в HSV
     * @param color
     */
    static rgb2hsv(color) {
        const max = Math.max(color.red, color.green, color.blue);
        const min = Math.min(color.red, color.green, color.blue);
        const d = max - min;
        let hue = 0;
        const saturation = (max === 0 ? 0 : d / max);
        const value = max / 255;
        switch (max) {
            case min:
                hue = 0;
                break;
            case color.red:
                hue = (color.green - color.blue) + d * (color.green < color.blue ? 6 : 0);
                hue /= 6 * d;
                break;
            case color.green:
                hue = (color.blue - color.red) + d * 2;
                hue /= 6 * d;
                break;
            case color.blue:
                hue = (color.red - color.green) + d * 4;
                hue /= 6 * d;
                break;
        }
        return { hue, saturation, value };
    }
    /**
     * Преобразует HSV в __hex
     * @param color
     */
    static hsv2hex(color) {
        return ColorUtils.rgb2hex(ColorUtils.hsv2rgb(color));
    }
    /**
     * Преобразует HEX в RGB
     * @param hex
     */
    static hex2rgb(hex) {
        if (hex.length === 3) {
            hex = hex.replace(/./g, "$&$&");
        }
        return {
            blue: parseInt(hex[4] + hex[5], 16),
            green: parseInt(hex[2] + hex[3], 16),
            red: parseInt(hex[0] + hex[1], 16),
        };
    }
    /**
     * Преобразует __hex цвет в hsv
     * @param hex
     */
    static hex2hsv(hex) {
        return ColorUtils.rgb2hsv(ColorUtils.hex2rgb(hex));
    }
    /**
     * Преобразует RGB в HEX
     * @param color
     */
    static rgb2hex(color) {
        const rgbToHex = (rgb) => {
            let hex = Number(rgb).toString(16);
            if (hex.length < 2) {
                hex = "0" + hex;
            }
            return hex;
        };
        return (rgbToHex(color.red) + rgbToHex(color.green) + rgbToHex(color.blue)).toUpperCase();
    }
}
/**
 * Код белого цвета
 */
ColorUtils.whiteNumber = 16777215;
/**
 * Код черного цвета
 */
ColorUtils.blackNumber = 0;
exports.ColorUtils = ColorUtils;
