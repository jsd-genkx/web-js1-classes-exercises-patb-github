// getter = special method that makes a property readable
// setter = special method that makes a property writable

// validate and modify a value when reading/writing a property

class Superhero {
  constructor(name, superpower) {
    this._name = name;
    this._superpower = superpower;
  }

  // // Getter
  // get name() {
  //   return this._name;
  // }

  // // Setter
  // set name(newName) {
  //   if (newName) {
  //     this._name = newName;
  //   } else {
  //     console.log("Name cannot be empty");
  //   }
  // }

  // // Getter
  // get superpower() {
  //   return this._superpower;
  // }

  // // Setter
  // set superpower(newSuperpower) {
  //   if (newSuperpower) {
  //     this._superpower = newSuperpower;
  //   } else {
  //     console.log("Superpower cannot be empty");
  //   }
  // }

  describe() {
    console.log(
      `I am ${this._name}, and my superpower is ${this._superpower}.`
    );
  }
}

const thor = new Superhero("Thor", "control over thunder and lightning");
thor.describe(); // Output: I am Thor, and my superpower is control over thunder and lightning.

// // Using setters to change properties
// thor.name = "Thor Odinson";
// thor.superpower = "godlike strength and control over thunder and lightning";

// Can still read and write without using getters and setters
thor._name = "Thor Odinson";
thor._superpower = "godlike strength and control over thunder and lightning";

thor.describe(); // Output: I am Thor Odinson, and my superpower is godlike strength and control over thunder and lightning.
