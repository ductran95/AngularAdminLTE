import { TestBed } from '@angular/core/testing';

import { AuthenticationInterceptor } from './authentication.interceptor';

describe('AuthenticationInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthenticationInterceptor = TestBed.get(AuthenticationInterceptor);
    expect(service).toBeTruthy();
  });
});
