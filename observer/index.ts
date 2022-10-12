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
    registerObserver(observer: Observer): void;

    // Метод исключения наблюдателя
    removeObserver(observer: Observer): void;

    // Метод оповещения наблюдателей
    notifyObservers(): void;
};

interface Observer {
    // Метод для обновления состояния погодной станции
    update(): void;
};

interface DisplayElement {
    // Метод для вывода данных на экраны погодной станции
    display(): void;
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
        this.observers.forEach((observer) => observer.update());
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
    // например, get методы получения конкретных данных

    getTemperature():number {
        return this.temperature;
    };

    getHumidity():number {
        return this.humidity;
    };

    getPressure():number {
        return this.pressure;
    };

};

// Класс для визуализации текущего состояния погоды

class CurrentConditionsDisplay implements Observer, DisplayElement {

    // Экран с текущем состоянием погоды отображает только температуру и влажность

    private temperature: number;
    private humidity: number;
    private weatherData: WeatherData;

    // конструктору передается объект WeatherData, который используется
    // для регистрации элемента в качестве наблюдателя

    constructor(weatherData: WeatherData) {
        this.weatherData = weatherData;
        this.weatherData.registerObserver(this);
    }

    update(): void {
        this.temperature = this.weatherData.getTemperature();
        this.humidity = this.weatherData.getHumidity();

        // При вызове update мы сохраняем значение температуры и влажности
        // после чего вызываем метод для их отображения display

        this.display()
    };

    display(): void {
        console.log(`Текущее состояние погоды: 
            Температура: ${this.temperature} градусов C,
            Влажность: ${this.humidity} % `
        )
    };
}; 

// экран для прогноза погоды

class ForecastDisplay implements Observer, DisplayElement {
    private weatherData: WeatherData;
    private currentPressure: number;
    private lastPressure: number;

    constructor(weatherData) {
        this.weatherData = weatherData;
        this.weatherData.registerObserver(this);
        this.currentPressure = 760;
        this.lastPressure = 0;
    }

    update(): void {
        this.lastPressure = this.currentPressure;
        this.currentPressure = this.weatherData.getPressure();
        this.display();
    }

    display(): void {
       // код вывода данных 
    }
}


// Формируем все объекты в единый объект программы \

class WeatherStation {
    weatherData: WeatherData;
    currentDisplay: CurrentConditionsDisplay

    constructor () {
        this.weatherData = new WeatherData();
        this.currentDisplay = new CurrentConditionsDisplay(this.weatherData);
    };

    // данынй метод имитирует работу погодной станции
    // передавая данные с определенной задержкой
    
    work():void {
        // Имитация получения новых данных
        this.weatherData.setMeasurements(25, 34, 756);
        setTimeout(() => {
            this.weatherData.setMeasurements(30, 29, 759);
        }, 10000);
        setTimeout(() => {
            this.weatherData.setMeasurements(33, 20, 761);
        }, 20000);
    };

}

// Запускаем станцию в тестовую работу
const station = new WeatherStation();
station.work();
