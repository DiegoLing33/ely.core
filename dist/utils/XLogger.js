"use strict";
/*
 *
 *  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *
 *   ,--. o                   |    o
 *   |   |.,---.,---.,---.    |    .,---.,---.
 *   |   |||---'|   ||   |    |    ||   ||   |
 *   `--' ``---'`---|`---'    `---'``   '`---|
 *              `---'                    `---'
 *
 * Copyright (C) 2016-2019, Yakov Panov (Yakov Ling)
 * Mail: <diegoling33@gmail.com>
 *
 * Это программное обеспечение имеет лицензию, как это сказано в файле
 * COPYING, который Вы должны были получить в рамках распространения ПО.
 *
 * Использование, изменение, копирование, распространение, обмен/продажа
 * могут выполняться исключительно в согласии с условиями файла COPYING.
 *
 * Файл: XLogger* Файл создан: 04.12.2018 07:03:21
 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * XLogger - логгер уровня X
 */
class XLogger {
    /**
     * Конструктор
     * @param props
     */
    constructor(props = {}) {
        /**
         * Запись логов в файл
         */
        this.writeLogs = false;
        /**
         * Главный префикс
         */
        this.mainPrefix = "";
        this.mainPrefix = props.mainPrefix || "ely";
        this.writeLogs = props.writeLogs || false;
        this.clear = props.clear || false;
    }
    /**
     * Формирует строку `[ OK ]` или `[ NO ]` в зависимости от условия
     * @param {boolean} condition
     * @return {string}
     */
    static getOkNoString(condition) {
        if (condition) {
            return "[ OK ]";
        }
        else {
            return "[ NO ]";
        }
    }
    /**
     * Filters the logger message
     *
     * @param {string} msg - the message
     * @param {boolean} [clearfix = false] - if true: color tags will remove
     *                                       else it will be evaluated
     *
     * @return {string} - evaluated of cleared message
     * @private
     */
    static __loggerFilter(msg, clearfix = false) {
        msg = msg.replace(/&rst/g, clearfix ? "" : XLogger.styles.reset);
        msg = msg.replace(/&red/g, clearfix ? "" : XLogger.styles.fgRed);
        msg = msg.replace(/&grn/g, clearfix ? "" : XLogger.styles.fgGreen);
        msg = msg.replace(/&cyn/g, clearfix ? "" : XLogger.styles.fgCyan);
        msg = msg.replace(/&gre/g, clearfix ? "" : XLogger.styles.fgGrey);
        msg = msg.replace(/&blu/g, clearfix ? "" : XLogger.styles.fgBlue);
        msg = msg.replace(/&ywl/g, clearfix ? "" : XLogger.styles.fgYellow);
        msg = msg.replace(/&mgn/g, clearfix ? "" : XLogger.styles.fgMagenta);
        msg = msg.replace(/&uns/g, clearfix ? "" : XLogger.styles.underscore);
        return msg;
    }
    static __log(...obj) {
        console.log(...obj);
    }
    static __error(...obj) {
        console.error(...obj);
    }
    /**
     * Отображает сообщение в консоль
     * @param {String} msg
     */
    log(msg) {
        if (XLogger.loggerLevel >= XLogger.loggerLevels.LOG)
            this._sendToConsole(msg, ["Log"]);
    }
    /**
     * Отображает сообщение в консоль от имени модуля module
     *
     * @param {String} module - модуль
     * @param {String} msg - сообщение
     */
    mod(module, msg) {
        if (XLogger.loggerLevel >= XLogger.loggerLevels.LOG)
            this._sendToConsole(msg, ["Module", [XLogger.styles.fgMagenta, module]]);
    }
    /**
     * Отображает сообщение об ошибке
     * @param {String} msg
     */
    error(msg) {
        if (XLogger.loggerLevel >= XLogger.loggerLevels.DEBUG)
            this._sendToConsole(msg, [[XLogger.styles.fgRed, "Error"]], true);
    }
    /**
     * Отображает предупреждение
     * @param {String} msg
     */
    warning(msg) {
        if (XLogger.loggerLevel >= XLogger.loggerLevels.DEBUG)
            this._sendToConsole(msg, [[XLogger.styles.fgMagenta, "Warning"]]);
    }
    /**
     * Выводит LOG информацию
     *
     * @param {string} message  - the message
     * @param {Array} prefixes - the array with the prefixes
     * @param {boolean} error - the error flag
     *
     * "prefixes" could be like:
     *
     *  1. [ "Log" ]                                - Simple
     *  2. [ "Module", "Test" ]                     - Tree
     *  3. [ "Module", [ "\x1b[32m", "Test" ] ]     - Tree with the color
     *
     *  @private
     */
    _sendToConsole(message, prefixes, error = false) {
        if (this.mainPrefix !== "") {
            const _temp = [[XLogger.styles.fgCyan, this.mainPrefix]];
            for (const _prefix of prefixes)
                _temp.push(_prefix);
            prefixes = _temp;
        }
        const dateString = new Date().toISOString().replace(/T/, " "). // replace T with a space
            replace(/\..+/, "");
        let _prefixToDisplay = "";
        let _clearPrefix = "";
        for (let _prefix of prefixes) {
            let _color = this.clear ? "" : XLogger.styles.fgGreen;
            if (_prefix instanceof Array) {
                _color = _prefix[0];
                _prefix = _prefix[1];
            }
            _prefixToDisplay += "[" + (!this.clear ? _color : "") + _prefix +
                (!this.clear ? XLogger.styles.reset : "") + "]";
            _clearPrefix += "[" + _prefix + "]";
        }
        const str = "[" + dateString + "]" + _clearPrefix + ": " + XLogger.__loggerFilter(message, true);
        const strToDisplay = "["
            + (!this.clear ? XLogger.styles.fgGrey : "")
            + dateString
            + (!this.clear ? XLogger.styles.reset : "")
            + "]"
            + _prefixToDisplay
            + (!this.clear ? XLogger.styles.reset : "")
            + ": " + XLogger.__loggerFilter(message) + (this.clear ? "" : XLogger.styles.reset);
        this._saveLogString(str);
        if (this.clear) {
            if (!error)
                XLogger.__log(XLogger.__loggerFilter(strToDisplay, true));
            else
                XLogger.__error(XLogger.__loggerFilter(strToDisplay, true));
        }
        else if (!error)
            XLogger.__log(strToDisplay);
        else
            XLogger.__error(strToDisplay);
    }
    /**
     * Записывает данные в файл
     *
     * @param {string} str
     * @private
     */
    _saveLogString(str) {
        // if (this.writeLogs)
        //     require("fs").appendFile("./logs/logger0.log", str + "\n", () => { /* Nothing is done. */
        //     });
    }
}
/**
 * Стандартный логгер
 */
XLogger.default = new XLogger({ mainPrefix: "Default" });
/**
 * Уровни логирования
 */
XLogger.loggerLevels = {
    DEBUG: 2,
    LOG: 1,
    NONE: 0,
};
/**
 * Текущий уровень логирования
 */
XLogger.loggerLevel = XLogger.loggerLevels.DEBUG;
/**
 * Стили
 */
XLogger.styles = {
    /**
     * Сбрасывает любой примененный эффект
     * @type {string}
     */
    reset: "\x1b[0m",
    /**
     * Делает цвет ярче
     * @type {string}
     */
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    /**
     * Подчернутый текст
     * @type {string}
     */
    underscore: "\x1b[4m",
    /**
     * Мигающий текст
     * @type {string}
     */
    blink: "\x1b[5m",
    /**
     * Скрытый текст
     */
    hidden: "\x1b[8m",
    /**
     * Развернутый текст
     */
    reverse: "\x1b[7m",
    /**
     * Font color: Black
     * @type {string}
     */
    fgBlack: "\x1b[30m",
    /**
     * Font color: Red
     * @type {string}
     */
    fgRed: "\x1b[31m",
    /**
     * Font color: Green
     * @type {string}
     */
    fgGreen: "\x1b[32m",
    /**
     * Font color: Yellow
     * @type {string}
     */
    fgYellow: "\x1b[33m",
    /**
     * Font color: Blue
     * @type {string}
     */
    fgBlue: "\x1b[34m",
    /**
     * Font color: Magenta
     * @type {string}
     */
    fgMagenta: "\x1b[35m",
    /**
     * Font color: Cyan
     * @type {string}
     */
    fgCyan: "\x1b[36m",
    /**
     * Font color: White
     * @type {string}
     */
    fgWhite: "\x1b[37m",
    /**
     * Font color: Grey
     * @type {string}
     */
    fgGrey: "\x1b[37m",
    /**
     * Background color: Black
     * @type {string}
     */
    bgBlack: "\x1b[40m",
    /**
     * Background color: Red
     * @type {string}
     */
    bgRed: "\x1b[41m",
    /**
     * Background color: Green
     * @type {string}
     */
    bgGreen: "\x1b[42m",
    /**
     * Background color: Yellow
     * @type {string}
     */
    bgYellow: "\x1b[43m",
    /**
     * Background color: Blue
     * @type {string}
     */
    bgBlue: "\x1b[44m",
    /**
     * Background color: Magenta
     * @type {string}
     */
    bgMagenta: "\x1b[45m",
    /**
     * Background color: Cyan
     * @type {string}
     */
    bgCyan: "\x1b[46m",
    /**
     * Background color: White
     * @type {string}
     */
    bgWhite: "\x1b[47m",
};
exports.default = XLogger;
