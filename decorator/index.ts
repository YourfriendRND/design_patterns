/**
 * Паттерн Декоратор динамически наделяет объект новыми
 * возможностями и является гибкой альтенативой
 * субклассированию в области расширения функциональности
 */

// Исходный класс любого напитка в кофейне

abstract class Beverage {
    description: string = "Unknown Beverage";

    getDescription = () => this.description;

    cost = (): number => 0;

};

// Абстрактный класс для дополнений базового напитка
// Объекты должны быть взаимозаменяемы, поэтому расширяем класс Beverage
abstract class CondimentDecorator extends Beverage {
    // объект Beverage, который будет "Заворачиваться"
    // в каждый Decorator.
    // Используется тип Beverage, чтобы декоратор мог 
    /// быть оберткой для любого напитка 
    beverage: Beverage
     
    getDescription = (): string => "";
};

// ОСНОВНЫЕ НАПИТКМИ (Без допов)

// Расширяем основной класс
class Espresso extends Beverage {
    
    constructor() {
        super();
        this.description = "Espresso";
    }

    // В данном напитке нет дополнений, поэтому 
    // возвращаем базовую стоимость напитка
    // В данном случае, стоимость эспрессо - 1.99$
    cost = (): number => 1.99;

};

class HouseBlend extends Beverage {
    
    constructor() {
        super();
        this.description = "House Blend Coffee";
    }

    cost = (): number => 0.89
};

class DarkRoast extends Beverage {
    
    constructor() {
        super();
        this.description = "Dark Roast Coffee";
    }

    cost = (): number => 0.99;

};

class Decaf extends Beverage {

    constructor() {
        super();
        this.description = "Decaf Coffee";
    }

    cost = (): number => 1.05

}

// ДОПОЛНЕНИЯ

// Класс декоратора расширяет CondimentDecorator, а он в свою очередь
// расширяет Beverage
class Mocha extends CondimentDecorator {

    constructor(beverage: Beverage) {
        super();
        this.beverage = beverage;
    };

    // Добавляем дополнение к основному неймингу напитка
    getDescription = (): string => this.beverage.getDescription() + ", Mocha";

    // Добавляем стоимость дополнения к основной стоимости
    cost = (): number => this.beverage.cost() + 0.20;

};

class Soy extends CondimentDecorator {

    constructor(beverage: Beverage) {
        super();
        this.beverage = beverage;
    }

    getDescription = (): string => this.beverage.getDescription() + ", Soy";

    cost = (): number => this.beverage.cost() + 0.15;
};


class Whip extends CondimentDecorator {

    constructor(beverage: Beverage) {
        super();
        this.beverage = beverage;
    };

    getDescription = (): string => this.beverage.getDescription() + ", Whip";

    cost = (): number => this.beverage.cost() + 0.1;
};


// Пробный вызов

const espresso = new Espresso();

console.log("Название напитка:", espresso.getDescription());

console.log("Стоимость напитка:",  espresso.cost());

const orderedBeveraged = new Whip(new Mocha(new Mocha(new DarkRoast())))

console.log("Название напитка:", orderedBeveraged.getDescription());

console.log("Стоимость напитка:",  orderedBeveraged.cost());

const nextOrederBeverage = new Whip(new Mocha(new Soy(new HouseBlend())));

console.log("Название напитка:", nextOrederBeverage.getDescription());

console.log("Стоимость напитка:",  nextOrederBeverage.cost());

/**
 * Более элегантный способ создания декорируемых объектов представлен
 * в паттерне Фабрика и паттерна Строитель
 */