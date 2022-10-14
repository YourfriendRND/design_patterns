/**
 * * Паттерн Одиночка гарантирует, что класс
 * * имеет только один экземпляр, и предоставляет
 * * глобальную точку доступа к этому экземпляру 
 */

class Singleton {
    static uniqInstance: Singleton | null;

    private constructor() {
        Singleton.uniqInstance = null;
    }

    static getInstance = (): Singleton => {
        if (!Singleton.uniqInstance) {
            Singleton.uniqInstance = new Singleton();
        }
        return Singleton.uniqInstance
    }

    // * Другие методы
};


const mySingletonExample = Singleton.getInstance();

const secondInstance = Singleton.getInstance();

console.log(mySingletonExample === secondInstance) // * Вернет true так как ссылка на один и тот же объект


// * В случае выполнения многопоточного ассинхронного кода
// * можно создать экземпляр заранее 
// * чтобы избежать ошибок со случайным созданием двух и более экземпляров

class SecondSingleton {
    static uniqInstance: SecondSingleton = new SecondSingleton();

    private constructor() {}

    static getInstance = (): SecondSingleton => {
        // * просто возвращаем заранее созданный экземпляр 
        return SecondSingleton.uniqInstance
    }

    // * Другие методы
};