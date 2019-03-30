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
 * Файл: DeviceDetector.ts                                                    *
 * Файл изменен: 27.02.2019 02:27:21                                          *
 *                                                                            *
 ******************************************************************************/
import Observable from "../observable/Observable";
import { SizeConstValue } from "../values/SizeValue";
/**
 * Детектор устройств и системы
 * @class DeviceDetector
 */
export default class DeviceDetector extends Observable {
    /**
     * Стандартный детектор
     */
    static default: DeviceDetector;
    /**
     * Имена операционных систем
     * @protected
     * @ignore
     */
    protected static __osNames: {
        name: string;
        value: string;
        version: string;
    }[];
    /**
     * Браузеры
     * @protected
     * @ignore
     */
    protected static __browsers: {
        name: string;
        value: string;
        version: string;
    }[];
    /**
     * Заголовки
     * @protected
     * @ignore
     */
    protected static __headers: string[];
    /**
     * Данные
     * @ignore
     * @protected
     */
    protected __data: {
        [key: string]: any;
    };
    /**
     * Конструктор
     */
    constructor();
    /**
     * Добавляет наблюдатель: распознавание закончено
     *
     * Имя обсервера: detected
     *
     * @param o - наблюдатель
     */
    addDetectedObserver(o: () => void): DeviceDetector;
    /**
     * Выполняет детектинг
     */
    detect(): void;
    /**
     * Возвращает имя системы
     * @return {string}
     */
    getOSName(): string;
    /**
     * Возвращает имя браузера
     * @return {string}
     */
    getBrowserName(): string;
    /**
     * Возвращает true, если приложение запущено отдельным приложением**
     * @return {boolean}
     */
    isStandalone(): boolean;
    /**
     * Возвращает true, если система iOS
     * @return {boolean}
     */
    isIOS(): boolean;
    /**
     * Возвращает соотнощение сторон
     * @return {number}
     */
    getRatio(): number;
    /**
     * Возвращает реальный размер жкрана
     * @return {SizeConstValue}
     */
    getScreenSize(): SizeConstValue;
    /**
     * Возвращает true, если устройство - iPhone X
     * @return {boolean}
     */
    isIPhoneX(): boolean;
}
