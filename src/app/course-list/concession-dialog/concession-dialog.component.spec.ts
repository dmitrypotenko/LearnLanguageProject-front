import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcessionDialogComponent } from './concession-dialog.component';

describe('ConcessionDialogComponent', () => {
  let component: ConcessionDialogComponent;
  let fixture: ComponentFixture<ConcessionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConcessionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcessionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
