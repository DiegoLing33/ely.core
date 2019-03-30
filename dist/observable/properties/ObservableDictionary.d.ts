import ObservableProperty from "./ObservableProperty";
/**
 * Элемент свойства словаря
 */
interface IObservableDictionaryItem<T> {
    [key: string]: T;
}
/**
 * Свойство словаря
 * @class ObservableDictionary
 * @template T
 */
export default class ObservableDictionary<T> extends ObservableProperty<IObservableDictionaryItem<T>> {
    /**
     * Конструктор
     * @param defaultValue
     */
    constructor(defaultValue?: IObservableDictionaryItem<T>);
    /**
     * Возвращакт словарь, как объекта
     */
    get(): IObservableDictionaryItem<T>;
    /**
     * Слушатель добавления новго элемента в словаре
     * @param observer
     */
    addNewItemObserver(observer: (key: string, value: T) => void): ObservableDictionary<T>;
    getSorted(handler?: (a: string, b: string) => number): ObservableDictionary<T>;
    /**
     * Слушатель удаления элемента в словаре
     * @param observer
     */
    addRemoveItemObserver(observer: (key: string, value: T) => void): ObservableDictionary<T>;
    /**
     * Возвращает элемент словаря или NULL
     * @param key
     */
    item(key: string): T | null;
    /**
     * Возвращает элемент по индексу
     * @param index
     */
    itemByIndex(index: number): {
        key: string;
        value: T;
    } | null;
    /**
     * Добавляет значение в словарь
     * @param key   - ключ
     * @param value - значение
     */
    add(key: string, value: T): ObservableDictionary<T>;
    /**
     * Удаляет значение из словаря
     * @param key
     */
    remove(key: string): boolean;
    /**
     * Очищает словарь
     */
    clear(): ObservableDictionary<T>;
    /**
     * Возвращает количество элементов в словаре
     *
     *
     *     // Создаём словарь
     *     let dictionary = new ely.observable.dictionary();
     *
     *     // Заполняем его элементами
     *     dictionary.add("a", 100);
     *     dictionary.add("b", 200);
     *     dictionary.add("c", 300);
     *
     *     console.log( dictionary.count() );
     *
     *     //3
     *
     *
     */
    count(): number;
    /**
     * Цикл по всем элементам словаря
     * @param iterator
     *
     *
     *     // Создаём словарь
     *     let dictionary = new ely.observable.dictionary();
     *
     *     // Заполняем его элементами
     *     dictionary.add("a", 100);
     *     dictionary.add("b", 200);
     *     dictionary.add("c", 300);
     *
     *     dictionary.forEach( (key, value) => {
     *        console.log(key + " " + value);
     *     });
     *
     *     //a 100
     *     //b 200
     *     //c 300
     *
     *
     */
    forEach(iterator: (key: string, value: T, iteration: number) => void): ObservableDictionary<T>;
    /**
     * Возвращает true, если существует ключ
     * @param key
     */
    contains(key: string): boolean;
    /**
     * Возвращает первый индекс значения или null, если значение не найдено.
     *
     * Данный метод можно использовать для проверки наличия значения.
     *
     * @param value
     */
    keyOf(value: T): string | null;
}
export {};
