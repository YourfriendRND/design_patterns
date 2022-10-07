/**
 * Пример реализации простой фабрики
 * Простая фабрика не явялется паттерном проектирования
 * скорее это идиома программирования
 */

export enum PizzaTypes {
    Cheese = 'cheese',
    Pepperoni = 'pepperoni',
    Clam = 'clam',
    Veggie = 'veggie',
    Greek = 'greek'
};

// Абстрактный класс с полезными реализациями,
// которые могут переопределяться в субклассах
// Продукт производимый фабрикой
export abstract class Pizza {
    type: string

    prepare = () => console.log('prepare process');
    
    bake = () => console.log('bake process');

    cut = () => console.log('cut process');

    box = () => console.log('box process');
}

// Конкретные реализации продукта
// Каждый продукт должен реализовать 
// интерфейс абстрактного класса
// и быть конкретным, если оба этих условия
// выполняются, то фабрика создает экземпляр и возвращает клиенту

class CheesePizza extends Pizza {
    type: 'cheese'
}

class PepperoniPizza extends Pizza {
    type: 'pepperoni'
}

class ClamPizza extends Pizza {
    type: 'clam'
}

class VeggiePizza extends Pizza {
    type: 'veggie'
}

class GreekPizza extends Pizza {
    type: 'greek'
}

// Фабрика должна быть единственной частью приложения,
// работающей с конкретными классами продукта

class SimplePizzaFactory {
    pizza: Pizza | null;

    createPizza = (type: string): Pizza => {
        this.pizza = null;

        switch (type) {
            case PizzaTypes.Cheese: this.pizza = new CheesePizza(); break
            case PizzaTypes.Clam: this.pizza = new ClamPizza(); break
            case PizzaTypes.Greek: this.pizza = new GreekPizza(); break
            case PizzaTypes.Pepperoni: this.pizza = new PepperoniPizza(); break
            case PizzaTypes.Veggie: this.pizza = new VeggiePizza(); break
            default: {
                throw Error("Sorry we don't make this type of pizza");
            }
        }

        return this.pizza;
    }

};

// Клиент фабрики, он обращается к фабрике 
// для получения конкретного экземпляра

class PizzaStore {
    factory: SimplePizzaFactory;
    pizza: Pizza;

    constructor(factory: SimplePizzaFactory) {
        this.factory = factory;
    };

    orderPizza = (type: string): Pizza => {
        this.pizza = this.factory.createPizza(type);
        this.pizza.prepare();
        this.pizza.bake();
        this.pizza.cut();
        this.pizza.box();

        return this.pizza; 
    }

};