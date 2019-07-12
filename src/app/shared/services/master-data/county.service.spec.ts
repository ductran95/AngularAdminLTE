import { TestBed } from '@angular/core/testing';
import { CountyService } from '@app/shared/services/master-data/county.service';


describe('CountyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CountyService = TestBed.get(CountyService);
    expect(service).toBeTruthy();
  });
});
