import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MayorMenorPageComponent } from './mayor-menor-page.component';

describe('MayorMenorPageComponent', () => {
  let component: MayorMenorPageComponent;
  let fixture: ComponentFixture<MayorMenorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MayorMenorPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MayorMenorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
