import { Injectable } from '@angular/core';
import { Roman } from './roman';

@Injectable()
export class RomanService {

  lastId: number = 0;

  romans: Roman[] = [];

  constructor() { }  

  // Simulate POST /roman
  addRoman(roman: Roman): RomanService {
    if (!roman.id) {
      roman.id = ++this.lastId;
    }
    this.romans.push(roman);
    return this;
  }

  // Simulate DELETE /roman/:id
  deleteRomanById(id: number): RomanService {
    this.romans = this.romans.filter(roman => roman.id !== id);
    return this;
  }

  // Simulate PUT /roman/:id
  updateRomanById(id: number, values: Object = {}): Roman {
    let roman = this.getRomanById(id);
    if (!roman) {
      return null;
    }
    Object.assign(roman, values);
    return roman;
  }

  // Simulate GET /roman
  getAllRomans() : Roman[] {
  	return this.romans;
  }

  // Simulate GET /roman/:id
  getRomanById(id: number) : Roman {
  	return this.romans.filter(roman => roman.id === id).pop();
  }

}
