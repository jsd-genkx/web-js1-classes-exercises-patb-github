// super = keyword used in classes to call the constructor or access the properties and methods of a parent (superclass)
// this = this object
// super = the parent object

class Animal {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  // with the super keyword we can extend methods from the parent class
  move(speed) {
    console.log(`The ${this.name} moves at a speed of ${speed}kph`);
  }
}

class Rabbit extends Animal {
  constructor(name, age, runSpeed) {
    super(name, age);
    // this.name = name;
    // this.age = age;
    this.runSpeed = runSpeed;
  }

  run() {
    console.log(`This ${this.name} can run`);
    super.move(this.runSpeed);
  }
}

class Fish extends Animal {
  constructor(name, age, swimSpeed) {
    super(name, age);
    // this.name = name;
    // this.age = age;
    this.swimSpeed = swimSpeed;
  }
  swim() {
    console.log(`This ${this.name} can swim`);
    super.move(this.swimSpeed);
  }
}

class Hawk extends Animal {
  constructor(name, age, flySpeed) {
    super(name, age);
    // this.name = name;
    // this.age = age;
    this.flySpeed = flySpeed;
  }
  fly() {
    console.log(`This ${this.name} can fly`);
    super.move(this.flySpeed);
  }
}

class Gopher extends Animal {
  constructor(name, age, digSpeed) {
    super(name, age);
    this.digSpeed = digSpeed;
  }
  dig() {
    console.log(`${this.name} the gopher can dig!`);
    super.move(this.digSpeed);
  }
}
// ReferenceError: Must call super constructor in derived class before accessing 'this'
const rabbit1 = new Rabbit("rabbit1", 1, 25);
const fish1 = new Fish("fish1", 2, 12);
const hawk1 = new Hawk("hawk1", 4, 50);

console.log(`Animal name is ${rabbit1.name}`);
console.log(`Animal age is ${rabbit1.age}`);
console.log(`Animal speed is ${rabbit1.runSpeed}`);

// with the super keyword we can extend methods from the parent class
fish1.swim();

const gopher = new Gopher("John", 2, 2.5);
for (let key in gopher) console.log(`Gopher ${key} is ${gopher[key]}.`);
gopher.dig();