export class Ammunition {
    image: string = null;
    name: string = null;
    number: number = null;

    constructor (model?) {
        if (model) {
            this.image = model.image;
            this.name = model.name;
            this.number = model.number;
        }
    }
}
