/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Roman } from './roman';
import { RomanService } from './roman.service';

describe('Service: Roman', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RomanService]
    });
  });

  describe('#getAllRomans()', () => {

    it('should return an empty array by default', inject([RomanService], (service: RomanService) => {
      expect(service.getAllRomans()).toEqual([]);
    }));

    it('should return all Romans', inject([RomanService], (service: RomanService) => {
      let roman1 = new Roman({titre: 'Hello 1', complete: false});
      let roman2 = new Roman({titre: 'Hello 2', complete: true});
      service.addRoman(roman1);
      service.addRoman(roman2);
      expect(service.getAllRomans()).toEqual([roman1, roman2]);
    }));

  });

  describe('#save(roman)', () => {

    it('should automatically assign an incrementing id', inject([RomanService], (service: RomanService) => {
      let roman1 = new Roman({titre: 'Hello 1', complete: false});
      let roman2 = new Roman({titre: 'Hello 2', complete: true});
      service.addRoman(roman1);
      service.addRoman(roman2);
      expect(service.getRomanById(1)).toEqual(roman1);
      expect(service.getRomanById(2)).toEqual(roman2);
    }));

  });

  describe('#deleteRomanById(id)', () => {

    it('should remove Roman with the corresponding id', inject([RomanService], (service: RomanService) => {
      let roman1 = new Roman({titre: 'Hello 1', complete: false});
      let roman2 = new Roman({titre: 'Hello 2', complete: true});
      service.addRoman(roman1);
      service.addRoman(roman2);
      expect(service.getAllRomans()).toEqual([roman1, roman2]);
      service.deleteRomanById(1);
      expect(service.getAllRomans()).toEqual([roman2]);
      service.deleteRomanById(2);
      expect(service.getAllRomans()).toEqual([]);
    }));

    it('should not removing anything if Roman with corresponding id is not found', inject([RomanService], (service: RomanService) => {
      let roman1 = new Roman({titre: 'Hello 1', complete: false});
      let roman2 = new Roman({titre: 'Hello 2', complete: true});
      service.addRoman(roman1);
      service.addRoman(roman2);
      expect(service.getAllRomans()).toEqual([roman1, roman2]);
      service.deleteRomanById(3);
      expect(service.getAllRomans()).toEqual([roman1, roman2]);
    }));

  });

  describe('#updateRomanById(id, values)', () => {

    it('should return Roman with the corresponding id and updated data', inject([RomanService], (service: RomanService) => {
      let roman = new Roman({titre: 'Hello 1', complete: false});
      service.addRoman(roman);
      let updatedRoman = service.updateRomanById(1, {
        titre: 'new titre'
      });
      expect(updatedRoman.titre).toEqual('new titre');
    }));

    it('should return null if Roman is not found', inject([RomanService], (service: RomanService) => {
      let roman = new Roman({titre: 'Hello 1', complete: false});
      service.addRoman(roman);
      let updatedRoman = service.updateRomanById(2, {
        titre: 'new titre'
      });
      expect(updatedRoman).toEqual(null);
    }));

  });

});
