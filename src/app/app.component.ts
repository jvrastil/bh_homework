import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {SelectItem} from 'primeng/api';

import { Weapon } from './models/weapon';
import { Rifle } from './models/rifle';
import { Optics } from './models/optics';
import { Ammunition } from './models/ammunition';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent {
  private http: HttpClient;
  title = 'bohemia-interactive-homework';

  display = false;
  weapon = new Weapon();
  originalWeapon = new Weapon();
  items = [];
  rifles: Rifle[] = [];
  optics: Optics[] = [];
  ammunitions: Ammunition[] = [];
  rifleItems: SelectItem[] = [];
  opticsItems: SelectItem[] = [];
  ammunitionItems: SelectItem[] = [];

  constructor(http: HttpClient) {
    this.http = http;

    this.loadFromLocalStorage();
    this.loadAllRifles();
    this.loadAllOptics();
    this.loadAllAmmunitions();
  }

  showDialog() {
      this.display = true;
  }

  saveWeapon() {
    this.display = false;

    this.originalWeapon.name = this.weapon.name;
    this.originalWeapon.rifle = this.weapon.rifle;
    this.originalWeapon.optics = this.weapon.optics;
    this.originalWeapon.ammunition = this.weapon.ammunition;
    this.saveToLocalStorage();

    console.log(this.weapon);
  }

  cancel() {
    this.display = false;

    this.weapon.name = this.originalWeapon.name;
    this.weapon.rifle = this.originalWeapon.rifle;
    this.weapon.optics = this.originalWeapon.optics;
    this.weapon.ammunition = this.originalWeapon.ammunition;

    console.log(this.weapon);
  }

  selectRifle(rifle: Rifle) {
    this.weapon.rifle = rifle;
  }

  selectOptics(optics: Optics) {
    this.weapon.optics = optics;
  }

  private loadAllRifles() {
    this.http.get('assets/rifles.json')
      .subscribe(response => {
        this.rifles = (response as any[]).map(a => new Rifle(a));
        this.rifleItems = this.mapSelectItems(this.rifles);
      });
  }

  private loadAllOptics() {
    this.http.get('assets/optics.json')
      .subscribe(response => {
        this.optics = (response as any[]).map(a => new Optics(a));
        this.opticsItems = this.mapSelectItems(this.optics);
      });
  }

  private loadAllAmmunitions() {
    this.http.get('assets/ammunitions.json')
      .subscribe(response => {
        this.ammunitions = (response as any[]).map(a => new Ammunition(a));
        this.ammunitionItems = this.mapSelectItems(this.ammunitions);
      });
  }

  private mapSelectItems(array: any[]): SelectItem[] {
    const result = array.map(i => {
      return {
        icon: i.image,
        label: i.name,
        value: i
      } as SelectItem;
    });
    result.unshift({} as SelectItem);

    return result;
  }

  loadFromLocalStorage() {
    try {
      const jsonObj = JSON.parse(localStorage.getItem('weapon'));
      this.weapon = new Weapon(jsonObj);
      this.originalWeapon = new Weapon(jsonObj);
      console.log('Loaded from LS', this.weapon);
    } catch {
      console.log('Local storage is not supported.');
      this.weapon = new Weapon();
    }
  }

  saveToLocalStorage() {
    try {
      localStorage.setItem('weapon', JSON.stringify(this.weapon));
      console.log('Saved to LS', this.weapon);
    } catch {
      console.log('Local storage is not supported');
    }
  }
}
