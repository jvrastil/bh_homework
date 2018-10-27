export class Optics {
    image: string = null;
    name: string = null;
    magnification: number = null;

    constructor(model?) {
        if (model) {
            this.image = model.image;
            this.name = model.name;
            this.magnification = model.magnification;
        }
    }
}
