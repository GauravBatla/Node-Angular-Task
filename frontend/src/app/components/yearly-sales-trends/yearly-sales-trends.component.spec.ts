import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearlySalesTrendsComponent } from './yearly-sales-trends.component';

describe('YearlySalesTrendsComponent', () => {
  let component: YearlySalesTrendsComponent;
  let fixture: ComponentFixture<YearlySalesTrendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YearlySalesTrendsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(YearlySalesTrendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
