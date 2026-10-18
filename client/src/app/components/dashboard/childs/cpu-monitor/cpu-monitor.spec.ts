import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpuMonitor } from './cpu-monitor';

describe('CpuMonitor', () => {
  let component: CpuMonitor;
  let fixture: ComponentFixture<CpuMonitor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CpuMonitor],
    }).compileComponents();

    fixture = TestBed.createComponent(CpuMonitor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
