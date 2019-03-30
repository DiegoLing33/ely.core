/**
 * XLogger - логгер уровня X
 */
export default class XLogger {
    /**
     * Стандартный логгер
     */
    static default: XLogger;
    /**
     * Уровни логирования
     */
    static loggerLevels: {
        DEBUG: number;
        LOG: number;
        NONE: number;
    };
    /**
     * Текущий уровень логирования
     */
    static loggerLevel: number;
    /**
     * Стили
     */
    static styles: {
        /**
         * Сбрасывает любой примененный эффект
         * @type {string}
         */
        reset: string;
        /**
         * Делает цвет ярче
         * @type {string}
         */
        bright: string;
        dim: string;
        /**
         * Подчернутый текст
         * @type {string}
         */
        underscore: string;
        /**
         * Мигающий текст
         * @type {string}
         */
        blink: string;
        /**
         * Скрытый текст
         */
        hidden: string;
        /**
         * Развернутый текст
         */
        reverse: string;
        /**
         * Font color: Black
         * @type {string}
         */
        fgBlack: string;
        /**
         * Font color: Red
         * @type {string}
         */
        fgRed: string;
        /**
         * Font color: Green
         * @type {string}
         */
        fgGreen: string;
        /**
         * Font color: Yellow
         * @type {string}
         */
        fgYellow: string;
        /**
         * Font color: Blue
         * @type {string}
         */
        fgBlue: string;
        /**
         * Font color: Magenta
         * @type {string}
         */
        fgMagenta: string;
        /**
         * Font color: Cyan
         * @type {string}
         */
        fgCyan: string;
        /**
         * Font color: White
         * @type {string}
         */
        fgWhite: string;
        /**
         * Font color: Grey
         * @type {string}
         */
        fgGrey: string;
        /**
         * Background color: Black
         * @type {string}
         */
        bgBlack: string;
        /**
         * Background color: Red
         * @type {string}
         */
        bgRed: string;
        /**
         * Background color: Green
         * @type {string}
         */
        bgGreen: string;
        /**
         * Background color: Yellow
         * @type {string}
         */
        bgYellow: string;
        /**
         * Background color: Blue
         * @type {string}
         */
        bgBlue: string;
        /**
         * Background color: Magenta
         * @type {string}
         */
        bgMagenta: string;
        /**
         * Background color: Cyan
         * @type {string}
         */
        bgCyan: string;
        /**
         * Background color: White
         * @type {string}
         */
        bgWhite: string;
    };
    /**
     * Формирует строку `[ OK ]` или `[ NO ]` в зависимости от условия
     * @param {boolean} condition
     * @return {string}
     */
    static getOkNoString(condition: boolean): string;
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
    protected static __loggerFilter(msg: string, clearfix?: boolean): string;
    protected static __log(...obj: any[]): void;
    protected static __error(...obj: any[]): void;
    /**
     * Запись логов в файл
     */
    writeLogs: boolean;
    /**
     * Чистый лог
     */
    clear: boolean;
    /**
     * Главный префикс
     */
    protected mainPrefix: string;
    /**
     * Конструктор
     * @param props
     */
    constructor(props?: {
        mainPrefix?: string;
        writeLogs?: boolean;
        clear?: boolean;
    });
    /**
     * Отображает сообщение в консоль
     * @param {String} msg
     */
    log(msg: string): void;
    /**
     * Отображает сообщение в консоль от имени модуля module
     *
     * @param {String} module - модуль
     * @param {String} msg - сообщение
     */
    mod(module: string, msg: string): void;
    /**
     * Отображает сообщение об ошибке
     * @param {String} msg
     */
    error(msg: string): void;
    /**
     * Отображает предупреждение
     * @param {String} msg
     */
    warning(msg: string): void;
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
    protected _sendToConsole(message: string, prefixes: any, error?: boolean): void;
    /**
     * Записывает данные в файл
     *
     * @param {string} str
     * @private
     */
    protected _saveLogString(str: string): void;
}
