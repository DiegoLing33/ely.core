import Observable from "../Observable";
/**
 * Новый обработчик
 */
declare type ObservablePropChangeHandler<T> = (value: T, oldVal?: T) => void;
/**
 * Обрабатываемое значение
 * @class ObservableProperty
 * @template T
 * @augments Observable
 */
export default class ObservableProperty<T> extends Observable {
    /**
     * Простое автоматизированное свойство
     * @param context
     * @param value
     * @param prop
     */
    static simplePropertyAccess(context: any, value: any, prop: ObservableProperty<any>): any;
    /**
     * Значение
     * @protected
     * @type {T}
     */
    protected value: T | null;
    /**
     * Флаг защиты от перезаписи
     * @ignore
     * @protected
     * @type {boolean}
     */
    protected isOverwriteProtected: boolean;
    /**
     * Конструктор
     * @param {T|null} defaultValue
     */
    constructor(defaultValue?: T | null);
    /**
     * Возвращает значение
     * @return {T|null}
     * @deprecated не рекомендовано использовать метод `get()` без
     * `guard` значения!
     *
     * Внимание. Пометка deprecated к данному методу не говорит о его ближайшем
     * сокращении. Только лишь о безопасности.
     */
    get(): T | null;
    /**
     * Возвращает значение или guard если значение null
     * @param {T} guard
     * @return {T}
     */
    get(guard: T): T;
    /**
     * Устанавливает флаг защиты от перезаписи.
     *
     * @param {boolean} flag
     * @return {this}
     *
     *
     *     // Создаем прослушиваемый параметр
     *     let prop = new ObservableProperty<string>();
     *     prop.set( "Tom" );
     *
     *     // Запрещаем перезапись
     *     prop.overwrite(false);
     *
     *     prop.set( "John" );
     *
     *     // Отображаем в консоль "защищенное" значение (с флагом guard)
     *     console.log( prop.get() ); // Tom
     *
     *
     */
    overwrite(flag: boolean): ObservableProperty<T>;
    /**
     * Устанавливает значение и вызывает оповещение `change`, прослушиваемое
     * методом {@link ObservableProperty.change}.
     *
     * @param {T} value
     * @return {this}
     *
     *
     *     // Создаем прослушиваемый параметр
     *     let prop = new ObservableProperty<string>();
     *     prop.set( "Tom" );
     *
     *     // Отображаем в консоль "защищенное" значение (с флагом guard)
     *     console.log( prop.get() ); // Tom
     *
     *
     */
    set(value: T): ObservableProperty<T>;
    /**
     * Возвращает true, если объект null или undefined.
     * @return {boolean}
     */
    isNull(): boolean;
    /**
     * Добавляет наблюдатель за изменением значения
     * @param {{function(value:T, oldValue:T?)}} observer - наблюдатель
     *
     *
     *
     *     // Создание свойства
     *     let observableString = new ObservableProperty<string>();
     *
     *     observableString.change( value => {
     *          console.log("Set to: " + value);
     *     });
     *
     *     observableString.set("123");
     *     observableString.set("abc");
     *
     *     // Вывод:
     *     // Set to: 123
     *     // Set to: abc
     *
     *
     *
     */
    change(observer: ObservablePropChangeHandler<T>): ObservableProperty<T>;
    /**
     * Преобразует объект в строку
     * @return {string}
     */
    toString(): string;
}
export {};
