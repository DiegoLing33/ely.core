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
/**
 * Локальное хранилище
 * @class LocalStorage
 */
export default class LocalStorage {
    /**
     * Стандартное локальное хранилище
     * @type {LocalStorage}
     */
    static default: LocalStorage;
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
    constructor(props: {
        name: string;
    });
    /**
     * Возвращает имя хранилища
     * @return {string}
     */
    getName(): string;
    /**
     * Устанавливает значение локального хранилища
     * @param {string} name - имя переменной
     * @param {*} value - значение
     * @param {Time|number} [time] - срок хранения
     */
    set(name: string, value: any, time?: Time | number): LocalStorage;
    /**
     * Возвращает значение хранилища
     * @param {string} name
     * @return {*}
     */
    get(name: string): any;
    /**
     * Удаляет переменную из локального хранилища
     * @param name
     */
    remove(name: string): LocalStorage;
}
