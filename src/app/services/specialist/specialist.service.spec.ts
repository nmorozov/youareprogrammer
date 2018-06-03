import { TestBed, inject } from '@angular/core/testing';

import { SpecialistService } from './specialist.service';

describe('SpecialistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpecialistService]
    });
  });

  it('should be created', inject([SpecialistService], (service: SpecialistService) => {
    expect(service).toBeTruthy();
  }));
});
