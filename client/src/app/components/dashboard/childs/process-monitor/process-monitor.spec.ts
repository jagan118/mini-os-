import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessMonitor } from './process-monitor';

describe('ProcessMonitor', () => {
  let component: ProcessMonitor;
  let fixture: ComponentFixture<ProcessMonitor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessMonitor],
    }).compileComponents();

    fixture = TestBed.createComponent(ProcessMonitor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
