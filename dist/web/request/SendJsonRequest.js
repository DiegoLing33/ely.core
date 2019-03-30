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
 + Файл: SendJsonRequest.ts                                             +
 + Файл изменен: 26.02.2019 23:45:06                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
Object.defineProperty(exports, "__esModule", { value: true });
const URLRequest_1 = require("./URLRequest");
/**
 * SendJsonRequest позволяет передавать JSON данные через POST запрос.
 *
 * JSON данные передаются в теле запроса. Отправка данных производится методом POST.
 *
 * Заголовки:
 * - Content-type: application/json; charset=utf-8
 *
 * @class SendJsonRequest
 * @augments {URLRequest}
 */
class SendJsonRequest extends URLRequest_1.default {
    /**
     * Выполняет отправку JSON данных
     *
     * @param {string} url - адрес
     * @param {*} object - объект для передачи
     * @param {TURLCallback} callback - обработчик результата
     */
    static send(url, object, callback) {
        new SendJsonRequest({ url, object }).send(callback);
    }
    /**
     * Конструктор
     * @param {ISendJsonRequestOptions} options
     */
    constructor(options) {
        super(options);
        this.__object = options.object;
    }
    /**
     * Выполняет запрос
     * @param {TURLCallback} callback
     */
    send(callback) {
        this.__method = URLRequest_1.URLRequestMethod.POST;
        this.__prepareXMLHttpRequestCore(callback);
        this.getXMLHttpRequest().send(JSON.stringify(this.getObject()));
    }
    /**
     * Устаналивает объект для передачи
     * @param {*} obj
     * @return {this}
     */
    setObject(obj) {
        this.__object = obj;
        return this;
    }
    /**
     * Возвращает объект для передачи
     * @return {*}
     */
    getObject() {
        return this.__object;
    }
}
exports.default = SendJsonRequest;
/**
 * @typedef {Object} ISendJsonRequestOptions
 * @property {string} url
 * @property {boolean} [async]
 * @property {*} [data]
 * @property {*} [object]
 */
