"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const Time_1 = require("../time/Time");
const Guard_1 = require("../utils/Guard");
const Cookies_1 = require("./Cookies");
/**
 * Локальное хранилище
 * @class LocalStorage
 */
class LocalStorage {
    /**
     * Создает локальное хранилище
     * @param {{ name: string }} props
     */
    constructor(props) {
        this.__name = props.name;
    }
    /**
     * Возвращает имя хранилища
     * @return {string}
     */
    getName() {
        return this.__name;
    }
    /**
     * Устанавливает значение локального хранилища
     * @param {string} name - имя переменной
     * @param {*} value - значение
     * @param {Time|number} [time] - срок хранения
     */
    set(name, value, time) {
        name = `${this.getName()}-${name}`;
        if (time && time instanceof Time_1.default)
            time = time.getTime();
        Cookies_1.default.set(name, JSON.stringify(value), { expires: time || 1000 * 60 * 60 * 24 * 356 });
        return this;
    }
    /**
     * Возвращает значение хранилища
     * @param {string} name
     * @return {*}
     */
    get(name) {
        name = `${this.getName()}-${name}`;
        return Guard_1.default.safeJsonParse(Cookies_1.default.get(name) || "", null);
    }
    /**
     * Удаляет переменную из локального хранилища
     * @param name
     */
    remove(name) {
        return this.set(name, null, -1);
    }
}
/**
 * Стандартное локальное хранилище
 * @type {LocalStorage}
 */
LocalStorage.default = new LocalStorage({ name: "ef" });
exports.default = LocalStorage;
