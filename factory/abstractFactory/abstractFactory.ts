/**
 * Паттерн Абстрактная фабрика предоставляет интерфейс
 * создания семейств взаимосвязанных или взаимозаменяемых 
 * объектов без указания их конкретных классов.
 */

import { PizzaTypes } from "../constants";

// Ингридиенты

abstract class Dough {
    type: string
};

abstract class Sauce {
    type: string
};

abstract class Cheese {
    type: string;
};

abstract class Veggie {
    type: string;
};

abstract class Clams {
    type: string;
};

abstract class Pepperoni {
    type: string;
};


// Конкретная реализация ингридиентов

class ThinCrustDough extends Dough {
    type: string;
    constructor () {
        super();
        this.type = "ThinCrustDough";
    }
};

class MarinaraSauce extends Sauce {
    type: string;
    constructor () {
        super();
        this.type = "MarinaraSauce";
    }
};

class PlumTomatoSauce extends Sauce {
    type: string;
    constructor () {
        super();
        this.type = "PlumTomatoSauce";
    }
};

class ReggianoCheese extends Cheese {
    type: string;
    constructor () {
        super();
        this.type = "ReggianoCheese";
    }
};

class MozzarellaCheese extends Cheese {
    type: string;
    constructor () {
        super();
        this.type = "MozzarellaCheese";
    }
}

class Garlic extends Veggie {
    type: string;
    constructor () {
        super();
        this.type = "Garlic";
    }
};

class Onion extends Veggie {
    type: string;
    constructor () {
        super();
        this.type = "Onion";
    }
};

class Mushroom extends Veggie {
    type: string;
    constructor () {
        super();
        this.type = "Mushroom";
    }
}; 

class RedPepper extends Veggie {
    type: string;
    constructor () {
        super();
        this.type = "RedPepper";
    }
};

class Spinach extends Veggie {
    type: string;
    constructor () {
        super();
        this.type = "Spinach";
    }
}

class BlackOlives extends Veggie {
    type: string;
    constructor () {
        super();
        this.type = "BlackOlives";
    }
};

class EggPlant extends Veggie {
    type: string;
    constructor () {
        super();
        this.type = "EggPlant";
    }
};

class FreshClams extends Clams {
    type: string;
    constructor () {
        super();
        this.type = "FreshClams";
    }
};

class FrozenClams extends Clams {
    type: string;
    constructor () {
        super();
        this.type = "FrozenClams";
    }
};

class SlicedPepperoni extends Pepperoni {
    type: string;
    constructor () {
        super();
        this.type = "SlicedPepperoni";
    }
};

// Любая региональная фабрика ингридиентов
// должна реализовать интерфейс фабрики ингридиентов

interface PizzaIngridientFactory {
    // Для каждого ингридиента в интерфейсе
    // определяется метод create
    
    createDough: () => Dough;
    
    createSauce: () => Sauce;
    
    createCheese: () => Cheese;
    
    createVeggie: () => Veggie[];
    
    createClams: () => Clams;
};


// Корнкретные классы фабрик (по региональному признаку)

class NYPizzaIngredientFactory implements PizzaIngridientFactory {
    
    createDough = () => new ThinCrustDough();

    createSauce = () => new MarinaraSauce();
    
    createCheese = () => new ReggianoCheese();
    
    createVeggie = () => [new Garlic(), new Onion(), new Mushroom(), new RedPepper()];
    
    createClams = () => new FreshClams();

    createPepperoni = () => new SlicedPepperoni(); 
};

class ChicagoPizzaIngredientFactory implements PizzaIngridientFactory {
    
    createDough = () => new ThinCrustDough();

    createSauce = () => new PlumTomatoSauce();

    createCheese = () => new MozzarellaCheese();

    createVeggie = () => [new Spinach(), new BlackOlives(), new EggPlant()];

    createClams = () => new FrozenClams();
    
    createPepperoni = () => new SlicedPepperoni(); 
};

// абстрактная пицца

abstract class Pizza {
    name: string;

    dough: Dough;

    sauce: Sauce;

    veggies: Veggie[];

    cheese: Cheese;

    pepperoni: Pepperoni;

    clam: Clams;

    ingridientFactory: PizzaIngridientFactory

    constructor(ingridientFactory: PizzaIngridientFactory) {
        this.ingridientFactory = ingridientFactory;
    }

    // Метод prepare - абстрактный метод.
    // В нём должны собираться ингридиенты,
    // необходимые для приготовления пиццы.
    // Ингридиенты в свою очередь будут производиться
    // фабрикой ингридиентов

    abstract prepare(): void;

    bake = (): void => {
        console.log("Выпекать при температуре 350 градусов в течение 25 минут");
    };

    cut = (): void => {
        console.log("Нарезать пиццу на равные кусочки");
    };

    box = (): void => {
        console.log("Упаковать в фирменную коробку");
    };

    setName = (name: string): void => {
        this.name = name;
    };

    getName = (): string => {
        return this.name;
    };

    // ... Другие методы

}

// конкретные реализации пиццы

class CheesePizza extends Pizza {
    
    constructor (ingridientFactory: PizzaIngridientFactory) {
        super(ingridientFactory);
        this.ingridientFactory = ingridientFactory;
    }

    prepare(): void {
        console.log(`Preparing ${this.name}`)
        this.dough = this.ingridientFactory.createDough();
        this.sauce = this.ingridientFactory.createSauce();
        this.cheese = this.ingridientFactory.createCheese();
        this.clam = this.ingridientFactory.createClams();
    }
}

class ClamPizza extends Pizza {
    
    constructor (ingridientFactory: PizzaIngridientFactory) {
        super(ingridientFactory);
        this.ingridientFactory = ingridientFactory;
    }

    prepare(): void {
        console.log(`Preparing ${this.name}`)
        this.dough = this.ingridientFactory.createDough();
        this.sauce = this.ingridientFactory.createSauce();
        this.cheese = this.ingridientFactory.createCheese();
        this.clam = this.ingridientFactory.createClams();
    }
}

class VeggiePizza extends Pizza {
    
    constructor (ingridientFactory: PizzaIngridientFactory) {
        super(ingridientFactory);
        this.ingridientFactory = ingridientFactory;
    }

    prepare(): void {
        console.log(`Preparing ${this.name}`)
        this.dough = this.ingridientFactory.createDough();
        this.sauce = this.ingridientFactory.createSauce();
        this.cheese = this.ingridientFactory.createCheese();
        this.veggies = this.ingridientFactory.createVeggie();
    }

}

// абстрактный PizzaStore

abstract class PizzaStore {
    pizza: Pizza | null;
    ingridientFactory: PizzaIngridientFactory
    
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


// Конкретные реализации PizzaStore

class NYPizzaStore extends PizzaStore {
    constructor() {
        super();
        this.pizza = null;
        this.ingridientFactory = new NYPizzaIngredientFactory();
    }

    protected createPizza(type: string): Pizza {
        switch(type) {
            case PizzaTypes.Cheese: {
                this.pizza = new CheesePizza(this.ingridientFactory);
                this.pizza.setName("New York Style Cheese Pizza");
                break;
            }
            case PizzaTypes.Clam: {
                this.pizza = new ClamPizza(this.ingridientFactory);
                this.pizza.setName("New York Style Clam Pizza");
                break;
            }
            case PizzaTypes.Veggie: {
                this.pizza = new VeggiePizza(this.ingridientFactory);
                this.pizza.setName("New York Style Veggie Pizza");
                break;
            }
            
            // Можно указать любые другие виды пицц 

            default: throw new Error("Sorry we don't make this type of pizza")

        }
        return this.pizza
    }

}


// Конкретные экземпляры и работа с ними

// 1. Получение конкретного экземпляра пицерии в Нью-Йоркском стиле
const nyPizzaStore = new NYPizzaStore();

// 2. Получение заказа и формирование типа заказанной пиццы
const orderType = "cheese";

// 3. Передача заказа в производство
const order = nyPizzaStore.orderPizza(orderType);

// Возвращаем готовый продукт клиенту
console.log(order);