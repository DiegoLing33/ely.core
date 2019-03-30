"use strict";
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
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
 + Файл: Time.ts                                                              +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Модуль elyFlat для работы со временем
 * @class Time
 */
class Time {
    /**
     * Конструткор
     * @param {{date?: Date}} options - опции
     */
    constructor(options = { date: new Date() }) {
        this.date = options.date;
    }
    /**
     * Создает объект времени по дате
     * @param {number} [day] - день
     * @param {number} [month] - месяц
     * @param {number} [year] - год
     * @param {number} [hour] - час
     * @param {number} [minute] - минута
     * @param {number} [second] - секунда
     *
     * @return {Time}
     */
    static byDate(day = 0, month = 0, year = 0, hour = 0, minute = 0, second = 0) {
        return new Time({ date: new Date(year, month - 1, day, hour, minute, second) });
    }
    /**
     * Возвращает объект текущего времени
     * @return {Time}
     */
    static now() {
        return new Time({ date: new Date() });
    }
    /**
     * Возвращает количество часов со склонением
     *
     * ```typescript
     *
     * Time.hoursString(5); // 5 часов
     * Time.hoursString(2); // 2 часа
     * ```
     *
     * @param {number} value - значение
     * @param {boolean} [isUpperFirstChar = false] - делает первую букву
     * величины закловной
     *
     * @return {string}
     *
     */
    static hoursString(value, isUpperFirstChar = false) {
        return Time.__stringByLastNumber(value, [
            "часов",
            "час",
            "часа",
        ], isUpperFirstChar);
    }
    /**
     * Возвращает количество минут со склонением
     *
     * ```typescript
     *
     * Time.minutesString(5); // 5 минут
     * Time.minutesString(2); // 2 минуты
     * ```
     *
     * @param {number} value - значение
     * @param {boolean} [isUpperFirstChar = false] - делает первую букву
     * величины закловной
     *
     * @return {string}
     *
     */
    static minutesString(value, isUpperFirstChar = false) {
        return Time.__stringByLastNumber(value, [
            "минут",
            "минута",
            "минуты",
        ], isUpperFirstChar);
    }
    /**
     * Возвращает количество секунд со склонением
     *
     * ```typescript
     *
     * Time.secondsString(5); // 5 секунд
     * Time.secondsString(2); // 2 секунды
     * ```
     *
     * @param {number} value - значение
     * @param {boolean} [isUpperFirstChar = false] - делает первую букву
     * величины закловной
     *
     *
     * @return {string}
     *
     */
    static secondsString(value, isUpperFirstChar = false) {
        return Time.__stringByLastNumber(value, [
            "секунд",
            "секунда",
            "секунды",
        ], isUpperFirstChar);
    }
    /**
     * Возвращает количество дней со склонением
     *
     * ```typescript
     *
     * Time.daysString(5); // 5 дней
     * Time.daysString(2); // 2 дня
     * ```
     *
     * @param {number} value - значение
     * @param {boolean} [isUpperFirstChar = false] - делает первую букву
     * величины закловной
     *
     * @return {string}
     *
     */
    static daysString(value, isUpperFirstChar = false) {
        return Time.__stringByLastNumber(value, [
            "дней",
            "день",
            "дня",
        ], isUpperFirstChar);
    }
    /**
     * Возвращает количество месяцев со склонением
     *
     * ```typescript
     *
     * Time.monthsString(5); // 5 месяцев
     * Time.monthsString(2); // 2 месяца
     * ```
     *
     * @param {number} value - значение
     * @param {boolean} [isUpperFirstChar = false] - делает первую букву
     * величины закловной
     *
     *
     * @return {string}
     */
    static monthsString(value, isUpperFirstChar = false) {
        return Time.__stringByLastNumber(value, [
            "месяцев",
            "месяц",
            "месяца",
        ], isUpperFirstChar);
    }
    /**
     * Возвращает количество лет со склонением
     *
     * ```typescript
     *
     * Time.yearsString(5); // 5 лет
     * Time.yearsString(2); // 2 года
     * ```
     *
     * @param {number} value - значение
     * @param {boolean} [isUpperFirstChar = false] - делает первую букву
     * величины закловной
     *
     * @return {string}
     */
    static yearsString(value, isUpperFirstChar = false) {
        return Time.__stringByLastNumber(value, [
            "лет",
            "год",
            "года",
        ], isUpperFirstChar);
    }
    /**
     * Преобразует временной код в части: дни, часы, минуты, секунды.
     * Такая технология может быть полезна для создания таймеров.
     *
     * Использование:
     * - Сначала необходимо получить разницу веремни, например, используя вычитание;
     * - Полученное значение может быть трансформировано через этот метод.
     *
     * @param {number }timeCode - врменной код
     * @return {ITimeDifferences}
     */
    static timeCodeToVars(timeCode) {
        const source = timeCode;
        timeCode /= 1000;
        const _days = Math.floor(timeCode / 86400);
        timeCode -= _days * 86400;
        const _hours = Math.floor(timeCode / 3600) % 24;
        timeCode -= _hours * 3600;
        const _minutes = Math.floor(timeCode / 60) % 60;
        timeCode -= _minutes * 60;
        const _seconds = Math.floor(timeCode % 60);
        return { days: _days, hours: _hours, minutes: _minutes, seconds: _seconds, source };
    }
    static __stringByLastNumber(num, list, isUpperFirstChar) {
        const str = list[Time.__lastNumberChar(num)];
        return num + " " + (isUpperFirstChar ? (str[0].toUpperCase() + str.substr(1)) : str);
    }
    static __lastNumberChar(num) {
        const d100 = num % 100;
        if (d100 > 10 && d100 < 15)
            return 0;
        const d10 = num % 10;
        if (d10 === 0 || d10 > 4)
            return 0;
        if (d10 === 1)
            return 1;
        if (d10 > 1 && d10 < 5)
            return 2;
        return 0;
    }
    /**
     * Возвращает timestamp
     * @return {number}
     */
    getTime() {
        return this.date.getTime();
    }
    /**
     * Возвращает количество дней в месяце для
     * даты, указанной в Time.
     *
     * @return {number}
     */
    getDaysInMonth() {
        return 32 - new Date(this.date.getFullYear(), this.date.getMonth(), 32).getDate();
    }
    /**
     * Возвращает разницу времени
     * @param {Time} time - время сравнения
     *
     * @return {ITimeDifferences}
     *
     *
     * ```ts
     *
     * const d1 = Time.byDate(10, 1, 2019);
     * const d2 = Time.byDate(15, 1, 2019);
     *
     * const diff = d1.getDifference(d2);
     * const daysString = Time.daysString(diff.days); // 5 дней
     * ```
     */
    getDifference(time) {
        return Time.timeCodeToVars(Math.abs(this.getTime() - time.getTime()));
    }
    /**
     * Возвращает разницу времени
     *
     * @return {ITimeDifferences}
     */
    getDifferenceNow() {
        return this.getDifference(Time.now());
    }
    /**
     * Возвращает true, елси текущее время позже, чем время,
     * указанное в аршументе.
     * @param {Time} time - время сравнения
     *
     * @return {boolean}
     */
    isLaterThen(time) {
        return this.getDifference(time).source > 0;
    }
    /**
     * Возвращает строку времени
     * @param {boolean} withTime - если установлено true, в строке будет отображено
     * время в формате HH:MM:SS
     *
     * @return {string}
     */
    getString(withTime = false) {
        const dateString = this.formatZero(this.date.getDate()) + "." +
            this.formatZero(this.date.getMonth() + 1) + "." + this.date.getFullYear();
        if (!withTime)
            return dateString;
        const timeString = this.formatZero(this.date.getHours()) + ":" +
            this.formatZero(this.date.getMinutes()) + ":" + this.formatZero(this.date.getSeconds());
        return `${dateString} ${timeString}`;
    }
    /**
     * Возвращает строку времени
     * @param withSeconds - флаг секунд. Добавляет или убирает SS из формата.
     *
     * @return {string}
     */
    getTimeString(withSeconds = true) {
        let ts = this.formatZero(this.date.getHours()) + ":" +
            this.formatZero(this.date.getMinutes());
        if (withSeconds)
            ts += ":" + this.formatZero(this.date.getSeconds());
        return ts;
    }
    /**
     * Возвращает дату
     * @return {{date: number, month: number, year: number}}
     */
    getDate() {
        return { date: this.date.getDate(), month: this.date.getMonth() + 1, year: this.date.getFullYear() };
    }
    /**
     * Возвращает время
     * @return {{hours: number, milliseconds: number, minutes: number, seconds: number}}
     */
    getDateTime() {
        return {
            hours: this.date.getHours(),
            milliseconds: this.date.getMilliseconds(),
            minutes: this.date.getMinutes(),
            seconds: this.date.getSeconds(),
        };
    }
    /**
     * Возвращает индекс дня недели
     * @return {number}
     */
    getWeekDayIndex() {
        switch (this.date.getDay()) {
            case 0:
                return 6;
            case 1:
                return 0;
            case 2:
                return 1;
            case 3:
                return 2;
            case 4:
                return 3;
            case 5:
                return 4;
            case 6:
                return 5;
            default:
                return 0;
        }
    }
    /**
     * Возвращает название дня недели
     * @param {boolean} isShort
     * @return {string}
     */
    getWeekDayName(isShort = false) {
        return isShort ? Time.weekDaysShortList[this.getWeekDayIndex()] :
            Time.weekDaysList[this.getWeekDayIndex()];
    }
    /**
     * Возвращает строку времени
     * @return {string}
     */
    toString() {
        return this.getString(true);
    }
    formatZero(str) {
        if (str % 10 === str) {
            return "0" + str;
        }
        return String(str);
    }
}
/**
 * Список дней ндели
 *
 * - "Понедельник"
 * - "Вторник"
 * - "Среда"
 * - "Четверг"
 * - "Пятница"
 * - "Суббота"
 * - "Воскресение"
 *
 * @type {string[]}
 */
Time.weekDaysList = [
    "Понедельник", "Вторник", "Среда",
    "Четверг", "Пятница", "Суббота", "Воскресение",
];
/**
 * Список коротких названий дней недели
 *
 * - "Пн"
 * - "Вт"
 * - "Ср"
 * - "Чт"
 * - "Пт"
 * - "Сб"
 * - "Вс"
 *
 * @type {string[]}
 */
Time.weekDaysShortList = [
    "Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс",
];
/**
 * Список названий мясяцев
 * @type {string[]}
 */
Time.monthsList = [
    "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",
];
/**
 * Список названий коротких названий мясяцев
 * @type {string[]}
 */
Time.monthsShortList = [
    "Янв", "Фев", "Мрт", "Апр", "Май", "Июн",
    "Июл", "Авг", "Сен", "Окт", "Ноб", "Дек",
];
exports.default = Time;
/**
 * @typedef {Object} ITimeDifferences
 * @property {number} days
 * @property {number} hours
 * @property {number} minutes
 * @property {number} seconds
 * @property {number} source
 */
