import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {Roman} from './roman';

describe('Roman', () => {

  it('should create an instance', () => {
    expect(new Roman()).toBeTruthy();
  });

  it('should accept values in the constructor', () => {
    let todo = new Roman({
      titre: 'hello',
      serie_id: null,
      genre_id: 1,
      volume: 2,
      volume_max: 5,
      auteurs_id: [1,2]

    });
    expect(todo.titre).toEqual('hello');
    expect(todo.serie_id).toEqual(null);
    expect(todo.genre_id).toEqual(1);
    expect(todo.volume).toEqual(2);
    expect(todo.volume_max).toEqual(5);
    expect(todo.auteurs_id).toEqual([1,2]);
  });

});