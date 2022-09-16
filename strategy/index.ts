/**
 * Паттерн "Стратегия"
 * определяет семейство алгоритмов, инкапсулирует каждый из них
 * и обеспечивает их взаимозаменяемость.
 * Он позволяет модифицировать алгоритмы независимо от их 
 * использования на стороне клиента.
 */

// поведение конкретного класса определяется интерфейсами
interface FlyBehavior {
    fly():void
};

interface QuackBehavior {
    quack(): void
};

// Абстрактный класс
class Duck {
    // объявляем две ссылочные переменные с типами интерфейсов поведения.
    // Переменные наследуются всеми субклассами Duck
    flyBehavior:FlyBehavior;
    quackBehavior: QuackBehavior;

    // Общие методы для всех субклассов. Каждая утка имеет внешний вид и каждая утка умеет плавать (даже приманка)
    display = ():void => {
        console.log("Представление класса")
    };

    swim = ():void => {
        console.log("Умение плавать")
    };

    // Делегирование операции классам поведения
    performQuack = () => {
        this.quackBehavior.quack();
    };

    performFly = () => {
        this.flyBehavior.fly();
    };

    // Динамическое изменение поведения
    setFlyBehavior = (behavior: FlyBehavior) => {
        this.flyBehavior = behavior;
    };

    setQuackBehavior = (behavior: QuackBehavior) => {
        this.quackBehavior = behavior;
    };

};

// классы поведения полета

class FlyWihtWings implements FlyBehavior {
    fly = () => {
        console.log("Полет на крыльях");
    };
};

class FlyNoWay implements FlyBehavior {
    fly = () => {
        console.log("Не умеею летать");
    }
};

// Классы поведения звуков разных видов уток

class Quack implements QuackBehavior {
    quack = () => {
        console.log("Кря!")
    }
};

class MuteQuack implements QuackBehavior {
    quack = () => {
        console.log("<< Тишина >>")
    }
};

class Squeak implements QuackBehavior {
    quack = () => {
        console.log("Писк");
    }
};

// Создадим модель утки с динамическим поведением

class ModelDuck extends Duck {
    constructor() {
        super()
        this.flyBehavior = new FlyNoWay();
        this.quackBehavior = new MuteQuack();
    };
}

// Добавим новое поведение полета

class FlyRocketPowered implements FlyBehavior {
    fly = () => {
        console.log("Полет на реактивной тяге");
    }
};

const model = new ModelDuck();
model.performFly(); // Не умеею летать
// способность утки-приманки к полету переключается динамически! 
model.setFlyBehavior(new FlyRocketPowered()); 
model.performFly() // Полет на реактивной тяге

