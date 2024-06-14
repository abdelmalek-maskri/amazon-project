class Car{
    #brand;
    #model;
    speed =0;
    isTrunkOpen =  false;
    constructor(carObject){
        this.#brand = carObject.brand;
        this.#model = carObject.model;
    }

    displayInfo(){
        const trunkStatus = this.isTrunkOpen ? 'open' : 'closed';
        console.log(`it is a ${this.#brand} and model ${this.#model}, speed: ${this.speed} the trunk is ${trunkStatus}`);
    }

    go(){
        if(this.speed <= 195 && !this.isTrunkOpen){
            this.speed +=5;
        }
    }

    break(){
        if(this.speed >= 5){
            this.speed -= 5
        }
    }
    openTrunk(){
        if(this.speed === 0){
            this.isTrunkOpen = true;
        }
        else{
            this.isTrunkOpen = false;
        }
    }
    closeTrunk(){
        this.isTrunkOpen = false;
    }


}

class RaceCar extends Car{
    acceleration;
    
    constructor(carObject){
        super(carObject);
        this.acceleration = carObject.acceleration;
    }

    go(){
        this.speed += this.acceleration;

        if (this.speed > 300) {
        this.speed = 300;
        }
    }

    openTrunk() {
        console.log('Race cars do not have a trunk.');
      }
    
    closeTrunk() {
        console.log('Race cars do not have a trunk.');
      }
}
const car1 = new Car({
    brand:'Toyota',
    model:'corolla'

});
const raceCar = new RaceCar({
    brand: 'McLaren',
    model: 'F1',
    acceleration: 20
  });

  car1.displayInfo();

raceCar.go();
raceCar.go();
raceCar.go();
raceCar.displayInfo();
raceCar.openTrunk();
raceCar.displayInfo();
raceCar.displayInfo();
