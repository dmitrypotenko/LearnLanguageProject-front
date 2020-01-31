import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutsiteComponent } from './aboutsite.component';

describe('MiddleComponent', () => {
  let component: AboutsiteComponent;
  let fixture: ComponentFixture<AboutsiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutsiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
