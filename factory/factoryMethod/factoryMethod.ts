/**
 * Паттерн Фабричный метод определяет интерфейс создания объекта,
 * но позволяет субклассам выбрать класс создаваемого экземпляра. 
 * Таким образом, Фабричный метод делегирует операцию создания
 * экземпляра субклассам.
 */

import { PizzaTypes } from "../constants";

abstract class Pizza {
    type: string

    prepare = () => console.log('prepare process');
    
    bake = () => console.log('bake process');

    cut = () => console.log('cut process');

    box = () => console.log('box process');
}

abstract class PizzaStore {
    pizza: Pizza;
    
    // Вся ответственность за создание экземпляров Pizza
    // перемещена в метод, действующий как фабрика
    protected abstract createPizza(type: string):Pizza;
    
    // Метод суперкласса понятия не имеет
    // какой из типов пицы мы хотим создать, он знает лишь то,
    // что пиццу можно приготовить, выпечь, нарезать и упаковать
    orderPizza = (type: string) => {
        this.pizza = this.createPizza(type);

        this.pizza.prepare();
        this.pizza.bake();
        this.pizza.cut();
        this.pizza.box();

        return this.pizza; 
    }
}

// Типы пицы что и в simpleFactory, но стиль приготовления должен отличаться

class NYStyleCheesePizza extends Pizza {
    type: 'cheese'
}

class NYStyleClamPizza extends Pizza {
    type: 'clam'
}

class NYStylePepperoniPizza extends Pizza {
    type: 'pepperoni'
}

class NYStyleVeggiePizza extends Pizza {
    type: 'veggie'
}

class NYStyleGreekPizza extends Pizza {
    type: 'greek'
}

class NYPizzaStore extends PizzaStore {
    
    // Метод возвращает объект типа Pizza
    // а субкласс NYPizzaStore несет полную ответственность
    // за создаваемый конкретный экземпляр Pizza
    createPizza = (type: string): Pizza => {
        switch (type) {
            case PizzaTypes.Cheese: return new NYStyleCheesePizza();
            case PizzaTypes.Clam: return new NYStyleClamPizza();
            case PizzaTypes.Pepperoni: return new NYStylePepperoniPizza();
            case PizzaTypes.Veggie: return new NYStyleVeggiePizza();
            case PizzaTypes.Greek: return new NYStyleGreekPizza();
            default: throw new Error("Sorry we don't make this type of pizza");
        }
    }
}

// Создание конкретной пицерии в Нью-Йорском стиле

const nyPizzaStore = new NYPizzaStore();

// В новую пиццерию поступает заказ 

const orderType = "veggie";

// Передача заказа на приготовление

const orderResult = nyPizzaStore.orderPizza(orderType);

// выдача заказа
console.log("Your pizza is ready:", orderResult)
