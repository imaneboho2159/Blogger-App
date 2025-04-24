import { TestBed } from '@angular/core/testing';

import { CommentServiceTsService } from './comment.service.ts.service';

describe('CommentServiceTsService', () => {
  let service: CommentServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
