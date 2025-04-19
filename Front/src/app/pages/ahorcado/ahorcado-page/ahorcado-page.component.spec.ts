import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AhorcadoPageComponent } from './ahorcado-page.component';

describe('AhorcadoPageComponent', () => {
  let component: AhorcadoPageComponent;
  let fixture: ComponentFixture<AhorcadoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AhorcadoPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AhorcadoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
