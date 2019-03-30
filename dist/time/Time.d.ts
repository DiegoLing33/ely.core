/**
 * Разница времени
 */
export interface ITimeDifferences {
    /**
     * Количество дней
     */
    days: number;
    /**
     * Количство часов
     */
    hours: number;
    /**
     * Количество минут
     */
    minutes: number;
    /**
     * Количество секунд
     */
    seconds: number;
    /**
     * Исходное значение разницы
     */
    source: number;
}
/**
 * Модуль elyFlat для работы со временем
 * @class Time
 */
export default class Time {
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
    static weekDaysList: string[];
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
    static weekDaysShortList: string[];
    /**
     * Список названий мясяцев
     * @type {string[]}
     */
    static monthsList: string[];
    /**
     * Список названий коротких названий мясяцев
     * @type {string[]}
     */
    static monthsShortList: string[];
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
    static byDate(day?: number, month?: number, year?: number, hour?: number, minute?: number, second?: number): Time;
    /**
     * Возвращает объект текущего времени
     * @return {Time}
     */
    static now(): Time;
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
    static hoursString(value: number, isUpperFirstChar?: boolean): string;
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
    static minutesString(value: number, isUpperFirstChar?: boolean): string;
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
    static secondsString(value: number, isUpperFirstChar?: boolean): string;
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
    static daysString(value: number, isUpperFirstChar?: boolean): string;
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
    static monthsString(value: number, isUpperFirstChar?: boolean): string;
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
    static yearsString(value: number, isUpperFirstChar?: boolean): string;
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
    static timeCodeToVars(timeCode: number): ITimeDifferences;
    private static __stringByLastNumber;
    private static __lastNumberChar;
    /**
     * Дата
     */
    private date;
    /**
     * Конструткор
     * @param {{date?: Date}} options - опции
     */
    constructor(options?: {
        date: Date;
    });
    /**
     * Возвращает timestamp
     * @return {number}
     */
    getTime(): number;
    /**
     * Возвращает количество дней в месяце для
     * даты, указанной в Time.
     *
     * @return {number}
     */
    getDaysInMonth(): number;
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
    getDifference(time: Time): ITimeDifferences;
    /**
     * Возвращает разницу времени
     *
     * @return {ITimeDifferences}
     */
    getDifferenceNow(): ITimeDifferences;
    /**
     * Возвращает true, елси текущее время позже, чем время,
     * указанное в аршументе.
     * @param {Time} time - время сравнения
     *
     * @return {boolean}
     */
    isLaterThen(time: Time): boolean;
    /**
     * Возвращает строку времени
     * @param {boolean} withTime - если установлено true, в строке будет отображено
     * время в формате HH:MM:SS
     *
     * @return {string}
     */
    getString(withTime?: boolean): string;
    /**
     * Возвращает строку времени
     * @param withSeconds - флаг секунд. Добавляет или убирает SS из формата.
     *
     * @return {string}
     */
    getTimeString(withSeconds?: boolean): string;
    /**
     * Возвращает дату
     * @return {{date: number, month: number, year: number}}
     */
    getDate(): {
        date: number;
        month: number;
        year: number;
    };
    /**
     * Возвращает время
     * @return {{hours: number, milliseconds: number, minutes: number, seconds: number}}
     */
    getDateTime(): {
        hours: number;
        minutes: number;
        seconds: number;
        milliseconds: number;
    };
    /**
     * Возвращает индекс дня недели
     * @return {number}
     */
    getWeekDayIndex(): number;
    /**
     * Возвращает название дня недели
     * @param {boolean} isShort
     * @return {string}
     */
    getWeekDayName(isShort?: boolean): string;
    /**
     * Возвращает строку времени
     * @return {string}
     */
    toString(): string;
    private formatZero;
}
/**
 * @typedef {Object} ITimeDifferences
 * @property {number} days
 * @property {number} hours
 * @property {number} minutes
 * @property {number} seconds
 * @property {number} source
 */
