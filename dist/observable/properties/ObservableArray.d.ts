import ObservableProperty from "./ObservableProperty";
declare type ObservableArrayAddHandler<T> = (newItem: T, index: number) => void;
declare type ObservableArrayRemoveHandler<T> = (remove: T) => void;
declare type ObservableArrayClearHandler<T> = () => void;
/**
 * Массив
 * @template T
 * @class ObservableArray
 * @augments ObservableProperty.<T[]>
 */
export default class ObservableArray<T> extends ObservableProperty<T[]> {
    /**
     * Конструктор
     */
    constructor();
    /**
     * Возвращает массив
     * @return {T[]}
     */
    get(): T[];
    /**
     * Регистрирует слушатель добавления нового элемента в массив
     * @param {function(newItem: {T}, index: number)} observer - слушатель
     */
    addNewItemObserver(observer: ObservableArrayAddHandler<T>): ObservableArray<T>;
    /**
     * Регистрирует слушатель изменения элементов массива
     * @param observer - слушатель
     */
    addChangeItemsObserver(observer: () => void): ObservableArray<T>;
    /**
     * Регистрирует слушатель очищения массива
     * @param observer - слушатель
     */
    addClearObserver(observer: ObservableArrayClearHandler<T>): ObservableArray<T>;
    /**
     * Регистрирует слушатель удаления элемента массива
     * @param observer - слушатель
     */
    addRemoveObserver(observer: ObservableArrayRemoveHandler<T>): ObservableArray<T>;
    /**
     * Добавляет элемент в массив
     * @param item
     */
    push(item: T): ObservableArray<T>;
    /**
     * Добавляет элемент в массив по индексу
     * @param {number} index
     * @param {...T} items
     */
    insert(index: number, ...items: T[]): this;
    /**
     * Добавляет элемент в массив
     * @param {number} index
     * @return {this}
     */
    remove(index: number): ObservableArray<T>;
    /**
     * Удаляет элемент из массива
     * @param {T} item - элемент массива
     * @return {this}
     */
    removeItem(item: T): ObservableArray<T>;
    /**
     * Возвращает элемент массива
     * @param {number} index
     */
    item(index: number): T;
    /**
     * Возвращает последний элемент
     * @return {T}
     */
    last(): T;
    /**
     * Возвращает последний элемент и удаляет его из массива
     * @return {T}
     */
    pop(): T | null;
    /**
     * Возвращает длину массива
     * @return {number}
     */
    length(): number;
    /**
     * Возвращает true, если существует индекс
     * @param {number} index
     */
    hasIndex(index: number): boolean;
    /**
     * Возвращает индекс элемента в массиве или -1, если
     * элемент не найден
     * @param {T} item
     */
    indexOf(item: T): number;
    /**
     * Возвращает true, если массив содержит item
     * @param {T} item
     */
    hasItem(item: T): boolean;
    /**
     * Очищает массив
     * @return {this}
     */
    clear(): ObservableArray<T>;
    /**
     * Возвращает true, если массив пустой
     * @return {boolean}
     */
    isEmpty(): boolean;
    /**
     * Элементы
     * @return {T[]}
     */
    items(): T[];
    /**
     * Устанавливает элемент в индексе массива
     * @param {T} item - элемент
     * @param {number} index - индекс
     * @deprecated Данный метод не рекомендуется к спользованию!
     */
    setItemAtIndex(item: T, index: number): ObservableArray<T>;
    /**
     * Цикл по элементам массива
     * @param {function(item: T, index: number, items: T[])} callbackfn - обработчик
     */
    forEach(callbackfn: (item: T, index: number, items: T[]) => void): ObservableArray<T>;
}
export {};
