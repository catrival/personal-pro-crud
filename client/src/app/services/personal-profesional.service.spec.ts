import { TestBed } from '@angular/core/testing';

import { PersonalProfesionalService } from './personal-profesional.service';

describe('PersonalProfesionalService', () => {
  let service: PersonalProfesionalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalProfesionalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
