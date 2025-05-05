import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscaminasPageComponent } from './buscaminas-page.component';

describe('BuscaminasPageComponent', () => {
  let component: BuscaminasPageComponent;
  let fixture: ComponentFixture<BuscaminasPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscaminasPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscaminasPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
