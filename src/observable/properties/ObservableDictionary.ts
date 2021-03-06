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
 + Файл: ObservableDictionary                                           +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import Guard from "../../utils/Guard";
import Utils from "../../utils/Utils";
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
    constructor(defaultValue: IObservableDictionaryItem<T> = {}) {
        super(defaultValue);
    }

    /**
     * Возвращакт словарь, как объекта
     */
    public get(): IObservableDictionaryItem<T> {
        return super.get()!;
    }

    /**
     * Слушатель добавления новго элемента в словаре
     * @param observer
     */
    public addNewItemObserver(observer: (key: string, value: T) => void): ObservableDictionary<T> {
        this.addObserver("newItem", observer);
        return this;
    }

    public getSorted(handler?: (a: string, b: string) => number): ObservableDictionary<T> {
        const ordered = new ObservableDictionary<T>();
        Object.keys(this.value!).sort(handler).forEach((key: string) => {
            ordered.add(key, this.value![key]);
        });
        return this;
    }

    /**
     * Слушатель удаления элемента в словаре
     * @param observer
     */
    public addRemoveItemObserver(observer: (key: string, value: T) => void): ObservableDictionary<T> {
        this.addObserver("removeItem", observer);
        return this;
    }

    /**
     * Возвращает элемент словаря или NULL
     * @param key
     */
    public item(key: string): T | null {
        const val = (this.value || {})[key];
        return Guard.isNone(val) ? null : val;
    }

    /**
     * Возвращает элемент по индексу
     * @param index
     */
    public itemByIndex(index: number): { key: string, value: T } | null {
        const key = Object.keys(this.value!)[index];
        return key ? {key, value: this.value![key]} : null;
    }

    /**
     * Добавляет значение в словарь
     * @param key   - ключ
     * @param value - значение
     */
    public add(key: string, value: T): ObservableDictionary<T> {
        this.value![key] = value;
        this.notificate("change", [this.value]);
        this.notificate("newItem", [key, value]);
        return this;
    }

    /**
     * Удаляет значение из словаря
     * @param key
     */
    public remove(key: string): boolean {
        if (this.value!.hasOwnProperty(key)) {
            const copy = this.value![key];
            delete this.value![key];
            this.notificate("change", [this.value]);
            this.notificate("removeItem", [key, copy]);
            return true;
        }
        return false;
    }

    /**
     * Очищает словарь
     */
    public clear(): ObservableDictionary<T> {
        this.set({});
        return this;
    }

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
    public count() {
        let count = 0;
        Utils.forEach(this.value, () => count++);
        return count;
    }

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
    public forEach(iterator: (key: string, value: T, iteration: number) => void): ObservableDictionary<T> {
        Utils.forEach(this.value, iterator);
        return this;
    }

    /**
     * Возвращает true, если существует ключ
     * @param key
     */
    public contains(key: string): boolean {
        return this.value!.hasOwnProperty(key);
    }

    /**
     * Возвращает первый индекс значения или null, если значение не найдено.
     *
     * Данный метод можно использовать для проверки наличия значения.
     *
     * @param value
     */
    public keyOf(value: T): string | null {
        let searched = null;
        Utils.forEach(this.value, (index: any, value1: any) => {
            if (value1 === value) {
                searched = index;
                return Utils.BREAK_FLAG;
            }
        });
        return searched;
    }

}
