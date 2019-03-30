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
 * Файл: LocalStorage.ts                                                      *
 * Файл изменен: 27.03.2019 18:56:06                                          *
 *                                                                            *
 ******************************************************************************/

import Time from "../time/Time";
import {safeJsonParse} from "../utils/Guard";
import Cookies from "./Cookies";

/**
 * Локальное хранилище
 * @class LocalStorage
 */
export default class LocalStorage {

    /**
     * Стандартное локальное хранилище
     * @type {LocalStorage}
     */
    public static default: LocalStorage = new LocalStorage({name: "ef"});

    /**
     * Имя хранилища
     * @protected
     * @ignore
     */
    protected readonly __name: string;

    /**
     * Создает локальное хранилище
     * @param {{ name: string }} props
     */
    public constructor(props: { name: string }) {
        this.__name = props.name;
    }

    /**
     * Возвращает имя хранилища
     * @return {string}
     */
    public getName(): string {
        return this.__name;
    }

    /**
     * Устанавливает значение локального хранилища
     * @param {string} name - имя переменной
     * @param {*} value - значение
     * @param {Time|number} [time] - срок хранения
     */
    public set(name: string, value: any, time?: Time | number): LocalStorage {
        name = `${this.getName()}-${name}`;
        if (time && time instanceof Time) time = time.getTime();
        Cookies.set(name, JSON.stringify(value), {expires: time || 1000 * 60 * 60 * 24 * 356});
        return this;
    }

    /**
     * Возвращает значение хранилища
     * @param {string} name
     * @return {*}
     */
    public get(name: string): any {
        name = `${this.getName()}-${name}`;
        return safeJsonParse(Cookies.get(name) || "", null);
    }

    /**
     * Удаляет переменную из локального хранилища
     * @param name
     */
    public remove(name: string): LocalStorage {
        return this.set(name, null, -1);
    }

}
