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
 * Файл: URLRequest.ts                                                        *
 * Файл изменен: 27.02.2019 03:07:17                                          *
 *                                                                            *
 ******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
const Observable_1 = require("../../observable/Observable");
const Guard_1 = require("../../utils/Guard");
/**
 * Методы передачи параметров
 * @enum
 */
var URLRequestMethod;
(function (URLRequestMethod) {
    URLRequestMethod["GET"] = "GET";
    URLRequestMethod["POST"] = "POST";
})(URLRequestMethod = exports.URLRequestMethod || (exports.URLRequestMethod = {}));
/**
 * Названия заголовков запроса
 * @enum
 */
var URLRequestHeaderName;
(function (URLRequestHeaderName) {
    URLRequestHeaderName["contentType"] = "Content-type";
})(URLRequestHeaderName = exports.URLRequestHeaderName || (exports.URLRequestHeaderName = {}));
/**
 * URL запрос
 * @class URLRequest
 * @augments {Observable}
 */
class URLRequest extends Observable_1.default {
    /**
     * Конструктор
     * @param options
     */
    constructor(options) {
        super();
        /**
         * @ignore
         */
        this.__async = true;
        this.__url = options.url;
        this.__xhr = new XMLHttpRequest();
        this.__method = options.method || URLRequestMethod.GET;
        this.__data = options.data || {};
        Guard_1.default.variable(options.async, value => this.__async = value, true);
    }
    /**
     * Отправляет GET запрос
     *
     * @param {string} url
     * @param {* | TURLCallback} data
     * @param {TURLCallback} callback
     */
    static sendGET(url, data, callback) {
        if (typeof data === "function")
            new URLRequest({ url }).send(data);
        else
            new URLRequest({ url, data }).send(callback);
    }
    /**
     * Возвращает URL запроса
     * @return {string}
     */
    getURL() {
        return this.__url;
    }
    /**
     * Возвращает данные запроса
     * @return {*}
     */
    getData() {
        return this.__data;
    }
    /**
     * Возвращает true, если запрос асинхронный
     * @return {boolean}
     */
    isAsync() {
        return this.__async;
    }
    /**
     * Возвращает метод
     * @return URLRequestMethod
     */
    getMethod() {
        return this.__method;
    }
    /**
     * Устанавливает данные
     * @param name
     * @param value
     */
    setData(name, value) {
        this.__data[name] = value;
        return this;
    }
    /**
     * Выполняет запрос
     * @param {TURLCallback} callback
     * @return URLRequest
     */
    send(callback) {
        this.__prepareXMLHttpRequestCore(callback);
        this.getXMLHttpRequest().send();
    }
    /**
     * Устанавливает заголовок
     *
     * @param {string|URLRequestHeaderName} name - имя заголовка
     * @param {string} value - значение заголовка
     * @return {this}
     */
    setHeader(name, value) {
        this.getXMLHttpRequest().setRequestHeader(name, value);
        return this;
    }
    /**
     * Возвращает ядро запроса
     * @return {XMLHttpRequest}
     */
    getXMLHttpRequest() {
        return this.__xhr;
    }
    /**
     * Добавляет наблюдатель: изменение прогресса
     *
     * Имя обсервера: progressChanged
     *
     * @param o - наблюдатель
     */
    addProgressChangedObserver(o) {
        this.addObserver("progressChanged", o);
        return this;
    }
    /**
     * Добавляет наблюдатель: завершения выполнения запроса
     *
     * Имя обсервера: ready
     *
     * @param o - наблюдатель
     */
    addReadyObserver(o) {
        this.addObserver("ready", o);
        return this;
    }
    /**
     * Возвращает строку параметров
     * @private
     */
    __getParametersString() {
        return Object
            .keys(this.getData())
            .map((key) => {
            return key + "=" + encodeURIComponent(this.getData()[key]);
        })
            .join("&");
    }
    __prepareXMLHttpRequestCore(callback) {
        this.getXMLHttpRequest().open(this.getMethod(), this.getURL() + "?" +
            this.__getParametersString(), this.isAsync());
        this.getXMLHttpRequest().onprogress = ev => {
            this.notificate("progressChanged", [ev.loaded, ev.total]);
        };
        this.getXMLHttpRequest().onreadystatechange = () => {
            if (this.getXMLHttpRequest().readyState === 4) {
                if (this.getXMLHttpRequest().status === 200) {
                    if (callback)
                        callback(this.getXMLHttpRequest().responseText, true);
                    this.notificate("ready", [this.getXMLHttpRequest().responseText, true]);
                }
                else {
                    if (callback)
                        callback(null, false);
                    this.notificate("ready", [null, false]);
                }
            }
        };
    }
}
exports.default = URLRequest;
/**
 * @typedef {Object} IURLRequestOptions
 * @property {string} url
 * @property {URLRequestMethod} [method]
 * @property {boolean} [async]
 * @property {*} data
 */
/**
 * Прогресс изменен
 * @callback TURLProgressChangedCallback
 * @param {number} loadedBytes - отпарвлено
 * @param {number} totalBytes - необходимо отправить
 */
/**
 * Ответ запроса
 * @callback TURLCallback
 * @param {*} response - ответ
 * @param {boolean} status - статус ответа
 */
