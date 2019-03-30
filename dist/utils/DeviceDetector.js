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
 * Файл: DeviceDetector.ts                                                    *
 * Файл изменен: 27.02.2019 02:27:21                                          *
 *                                                                            *
 ******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
const Observable_1 = require("../observable/Observable");
const SizeValue_1 = require("../values/SizeValue");
/**
 * Детектор устройств и системы
 * @class DeviceDetector
 */
class DeviceDetector extends Observable_1.default {
    /**
     * Конструктор
     */
    constructor() {
        super();
        /**
         * Данные
         * @ignore
         * @protected
         */
        this.__data = {
            browser: null,
            os: null,
        };
    }
    /**
     * Добавляет наблюдатель: распознавание закончено
     *
     * Имя обсервера: detected
     *
     * @param o - наблюдатель
     */
    addDetectedObserver(o) {
        this.addObserver("detected", o);
        return this;
    }
    /**
     * Выполняет детектинг
     */
    detect() {
        for (const os of DeviceDetector.__osNames)
            if (navigator.userAgent.indexOf(os.value) > -1) {
                this.__data.os = os.name;
                break;
            }
        for (const browser of DeviceDetector.__browsers)
            if (navigator.userAgent.indexOf(browser.value) > -1) {
                this.__data.browser = browser.name;
                break;
            }
        this.notificate("detected");
    }
    /**
     * Возвращает имя системы
     * @return {string}
     */
    getOSName() {
        return this.__data.os || "Undetected";
    }
    /**
     * Возвращает имя браузера
     * @return {string}
     */
    getBrowserName() {
        return this.__data.browser || "Undefined";
    }
    /**
     * Возвращает true, если приложение запущено отдельным приложением**
     * @return {boolean}
     */
    isStandalone() {
        // @ts-ignore
        return window.navigator.standalone || false;
    }
    /**
     * Возвращает true, если система iOS
     * @return {boolean}
     */
    isIOS() {
        return /iPad|iPhone|iPod/.test(this.__data.os);
    }
    /**
     * Возвращает соотнощение сторон
     * @return {number}
     */
    getRatio() {
        return window.devicePixelRatio || 1;
    }
    /**
     * Возвращает реальный размер жкрана
     * @return {SizeConstValue}
     */
    getScreenSize() {
        return new SizeValue_1.SizeConstValue({
            height: window.screen.height * this.getRatio(),
            width: window.screen.width * this.getRatio(),
        });
    }
    /**
     * Возвращает true, если устройство - iPhone X
     * @return {boolean}
     */
    isIPhoneX() {
        const size = this.getScreenSize();
        return this.isIOS() && size.width() === 1125 && size.height() === 2436;
    }
}
/**
 * Стандартный детектор
 */
DeviceDetector.default = new DeviceDetector();
/**
 * Имена операционных систем
 * @protected
 * @ignore
 */
DeviceDetector.__osNames = [
    { name: "Windows Phone", value: "Windows Phone", version: "OS" },
    { name: "Windows", value: "Win", version: "NT" },
    { name: "iPhone", value: "iPhone", version: "OS" },
    { name: "iPad", value: "iPad", version: "OS" },
    { name: "iPod", value: "iPod", version: "OS" },
    { name: "Kindle", value: "Silk", version: "Silk" },
    { name: "Android", value: "Android", version: "Android" },
    { name: "PlayBook", value: "PlayBook", version: "OS" },
    { name: "BlackBerry", value: "BlackBerry", version: "/" },
    { name: "MacOS", value: "Mac", version: "OS X" },
    { name: "Linux", value: "Linux", version: "rv" },
    { name: "Palm", value: "Palm", version: "PalmOS" },
];
/**
 * Браузеры
 * @protected
 * @ignore
 */
DeviceDetector.__browsers = [
    { name: "Chrome", value: "Chrome", version: "Chrome" },
    { name: "Firefox", value: "Firefox", version: "Firefox" },
    { name: "Safari", value: "Safari", version: "Version" },
    { name: "Internet Explorer", value: "MSIE", version: "MSIE" },
    { name: "Opera", value: "Opera", version: "Opera" },
    { name: "BlackBerry", value: "CLDC", version: "CLDC" },
    { name: "Mozilla", value: "Mozilla", version: "Mozilla" },
];
/**
 * Заголовки
 * @protected
 * @ignore
 */
DeviceDetector.__headers = [
    navigator.platform,
    navigator.userAgent,
    navigator.appVersion,
    navigator.vendor,
];
exports.default = DeviceDetector;
