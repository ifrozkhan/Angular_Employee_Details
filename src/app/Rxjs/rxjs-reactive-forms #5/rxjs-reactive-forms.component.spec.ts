import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsReactiveFormsComponent } from './rxjs-reactive-forms.component';

describe('RxjsReactiveFormsComponent', () => {
  let component: RxjsReactiveFormsComponent;
  let fixture: ComponentFixture<RxjsReactiveFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RxjsReactiveFormsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RxjsReactiveFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
