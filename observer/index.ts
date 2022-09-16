/**
 * Паттерн "Наблюдатель"
 * определяет отношение "один ко многим" между
 * объектами такким образом, что при измененеии 
 * состояния одного объекта происходит автоматическое
 * оповещение и обновление всех зависимых объектов. 
 * 
 */

interface Subject {
    // Метод регистрации наблюдателя
    registerObserver (observer: Observer):void;
    
    // Метод исключения наблюдателя
    removeObserver (observer: Observer):void;

    // Метод оповещения наблюдателей
    notifyObservers ():void;
};

interface Observer {
    // Метод для обновления состояния погодной станции
    update (temperature: number, humidity: number, pressure: number):void; 
};

interface DisplayElement {
    // Метод для вывода данных на экраны погодной станции
    display ():void;
};

// Реализация интерфейсов

class WeatherData implements Subject {
    observers: Observer[]; // Добавляем контейнер для хранения наблюдателей и инициализируем его в конструкторе
    temperature: number;
    humidity: number;
    pressure: number;

    constructor() {
        this.observers = [];
    };

    registerObserver(observer: Observer): void {
        this.observers.push(observer); // Новые наблюдатели добавляются в конец списка
    };

    removeObserver(observer: Observer): void {
        // Если наблюдатель отписывается, то фильтруем массив и возвращаем только тех наблюдателей, у которых не совпадает ссылка
        // с отписывающимся объектом 
        this.observers = this.observers.filter((element) => element !== observer); 
    };

    notifyObservers(): void {
        // При уведомлении подписчиков вызывается метод update
        // который реализуется всеми подписчиками
        this.observers.forEach((observer) => observer.update(this.temperature, this.humidity, this.pressure)); 
    };

    measurementsChanged(): void {
        // При изменении данных о погоде вызывается метод для уведомления подписчиков
        this.notifyObservers();
    };

    setMeasurements(temperature: number, humidity: number, pressure: number) {
        // Метод для установки изменений погодных условий
        this.temperature = temperature;
        this.humidity = humidity;
        this.pressure = pressure;
        this.measurementsChanged();
    };

    // Могут быть другие методы...
}




