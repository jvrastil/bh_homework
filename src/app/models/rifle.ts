export class Rifle {
    image: string = null;
    name: string = null;
    description: string = null;

    constructor(model?) {
        if (model) {
            this.image = model.image;
            this.name = model.name;
            this.description = model.description;
        }
    }
}
