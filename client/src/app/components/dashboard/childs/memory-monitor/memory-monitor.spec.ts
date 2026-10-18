import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoryMonitor } from './memory-monitor';

describe('MemoryMonitor', () => {
  let component: MemoryMonitor;
  let fixture: ComponentFixture<MemoryMonitor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemoryMonitor],
    }).compileComponents();

    fixture = TestBed.createComponent(MemoryMonitor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
