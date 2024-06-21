import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContnentLayoutComponent } from './contnent-layout.component';

describe('ContnentLayoutComponent', () => {
  let component: ContnentLayoutComponent;
  let fixture: ComponentFixture<ContnentLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContnentLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContnentLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
