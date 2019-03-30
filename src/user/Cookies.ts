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
 * Файл: Cookies.ts                                                           *
 * Файл изменен: 27.02.2019 01:01:19                                          *
 *                                                                            *
 ******************************************************************************/

/**
 * Печеньки
 *
 * @deprecated Используйте {@link LocalStorage}
 */
export default class Cookies {

    /**
     * Возвращает данные cookie
     * @param name
     */
    public static get(name: string): string | null {
        const matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)",
        ));
        const val = matches ? decodeURIComponent(matches[1]) : null;
        if (val && (val === "undefined" || val === "null")) return null;
        return val;
    }

    /**
     * Устанавливает cookie
     * @param name
     * @param value
     * @param options
     */
    public static set(name: string, value: any, options?: { expires?: string | number | Date } & any) {
        options = options || {};
        let expires = options.expires;
        if (typeof expires === "number" && expires) {
            const d = new Date();
            d.setTime(d.getTime() + expires);
            expires = options.expires = d;
        }
        if (expires && (expires as Date).toUTCString) {
            options.expires = (expires as Date).toUTCString();
        }

        value = encodeURIComponent(value);

        let updatedCookie = name + "=" + value;

        for (const propName in options) {
            if (!options.hasOwnProperty(propName)) continue;
            updatedCookie += "; " + propName;
            const propValue = options[propName];
            if (propValue !== true) {
                updatedCookie += "=" + propValue;
            }
        }
        document.cookie = updatedCookie;
    }
}
