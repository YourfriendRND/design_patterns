// Ингридиенты

abstract class Dough {
    type: string
};

abstract class Sauce {
    type: string
}

abstract class Cheese {
    type: string;
}

abstract class Veggie {
    type: string;
}

abstract class Clams {
    type: string;
}

abstract class Pepperoni {
    type: string;
}

// Фабрика ингридиентов

interface PizzaIngridientFactory {
    // Для каждого ингридиента в интерфейсе
    // определяется метод create
    
    createDough: () => Dough;
    
    createSauce: () => Sauce;
    
    createCheese: () => Cheese;
    
    createVeggie: () => Veggie[];
    
    createClams: () => Clams;
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
}

class EggPlant extends Veggie {
    type: string;
    constructor () {
        super();
        this.type = "EggPlant";
    }
}

class FreshClams extends Clams {
    type: string;
    constructor () {
        super();
        this.type = "FreshClams";
    }
}

class FrozenClams extends Clams {
    type: string;
    constructor () {
        super();
        this.type = "FrozenClams";
    }
}

class SlicedPepperoni extends Pepperoni {
    type: string;
    constructor () {
        super();
        this.type = "SlicedPepperoni";
    }
}

class NYPizzaIngredientFactory implements PizzaIngridientFactory {
    
    createDough = () => new ThinCrustDough();

    createSauce = () => new MarinaraSauce();
    
    createCheese = () => new ReggianoCheese();
    
    createVeggie = () => [new Garlic(), new Onion(), new Mushroom(), new RedPepper()];
    
    createClams = () => new FreshClams();

    createPepperoni = () => new SlicedPepperoni(); 
}

class ChicagoPizzaIngredientFactory implements PizzaIngridientFactory {
    
    createDough = () => new ThinCrustDough();

    createSauce = () => new PlumTomatoSauce();

    createCheese = () => new MozzarellaCheese();

    createVeggie = () => [new Spinach(), new BlackOlives(), new EggPlant()];

    createClams = () => new FrozenClams();
    
    createPepperoni = () => new SlicedPepperoni(); 
}


abstract class Pizza {
    name: string;

    dough: Dough;

    sauce: Sauce;

    veggies: Veggie[];

    cheese: Cheese;

    pepperoni: Pepperoni;

    clam: Clams;

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