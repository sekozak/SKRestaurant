import { TestBed } from '@angular/core/testing';

import { MenagGuard } from './menag.guard';

describe('MenagGuard', () => {
  let guard: MenagGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MenagGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
