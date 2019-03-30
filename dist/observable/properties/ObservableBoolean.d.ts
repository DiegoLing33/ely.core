import ObservableProperty from "./ObservableProperty";
/**
 * Прослушиваемый булевый тип
 * @class ObservableBoolean
 * @augments {ObservableProperty<boolean>}
 */
export default class ObservableBoolean extends ObservableProperty<boolean> {
    /**
     * Конструктор
     * @param {boolean} [defaultValue = false]
     */
    constructor(defaultValue?: boolean);
    /**
     * Переключает значение
     * @return {ObservableBoolean}
     */
    toggle(): ObservableBoolean;
}
