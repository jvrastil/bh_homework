import { Rifle } from './rifle';
import { Optics } from './optics';
import { Ammunition } from './ammunition';

export class Weapon {
    name: string = null;
    rifle: Rifle = null;
    optics: Optics = null;
    ammunition: Ammunition = null;

    constructor(model?) {
        if (model) {
            this.name = model.name;
            this.rifle = new Rifle(model.rifle);
            this.optics = new Optics(model.optics);
            this.ammunition = new Ammunition(model.ammunition);
        }
    }
}
