import { TestBed } from '@angular/core/testing';

import { ReviewStorageService } from './review-storage.service';

describe('ReviewStorageService', () => {
  let service: ReviewStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
