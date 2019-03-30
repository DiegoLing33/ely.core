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
 + Файл: SendFileRequest.ts                                             +
 + Файл изменен: 27.02.2019 00:18:04                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
Object.defineProperty(exports, "__esModule", { value: true });
const URLRequest_1 = require("./URLRequest");
/**
 * Запрос отправки файла
 * @class SendFileRequest
 * @augments {URLRequest}
 */
class SendFileRequest extends URLRequest_1.default {
    /**
     * Выполняет отправку файлов
     *
     * @param {string} url - адрес
     * @param {*} files - объект для передачи
     * @param {TURLCallback} callback - обработчик результата
     * @return SendFileRequest
     */
    static send(url, files, callback) {
        new SendFileRequest({ url, files }).send(callback);
    }
    /**
     * Конструктор
     * @param {ISendFileRequestOptions} options
     */
    constructor(options) {
        super(options);
        this.__files = options.files || [];
    }
    /**
     * Выполняет запрос
     *
     * @param {TURLCallback} callback
     */
    send(callback) {
        this.__method = URLRequest_1.URLRequestMethod.POST;
        this.__prepareXMLHttpRequestCore(callback);
        const theFormData = new FormData();
        this.getFiles().forEach(file => {
            theFormData.append("file", file);
        });
        this.getXMLHttpRequest().send(theFormData);
    }
    /**
     * Добавляет файлы
     * @param {...File} files - файлы
     * @return SendFileRequest
     */
    addFiles(...files) {
        this.__files.push(...files);
        return this;
    }
    /**
     * Возвращает файлы
     */
    getFiles() {
        return this.__files;
    }
}
exports.default = SendFileRequest;
/**
 * @typedef {Object} ISendFileRequestOptions
 * @property {string} url
 * @property {boolean} [async]
 * @property {*} [data]
 * @property {File[]} [files]
 */
