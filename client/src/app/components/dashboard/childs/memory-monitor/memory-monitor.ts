import { Component, input, computed } from '@angular/core';
import { MemoryData } from '../../../../models/monitor.interface';
import { RadialGaugeComponent } from '../../radial-gauge.component';

@Component({
  selector: 'app-memory-monitor',
  imports: [RadialGaugeComponent],
  templateUrl: './memory-monitor.html',
  styleUrl: './memory-monitor.css',
})
export class MemoryMonitor {
  data = input.required<MemoryData>();

  totalRAM = computed(() => parseFloat(this.data().totalRAM)); // ← missing
  usedRAM = computed(() => parseFloat(this.data().usedRAM));   // ← missing
  freeRAM = computed(() => parseFloat(this.data().freeRAM));   // ← missing
  usage = computed(() => parseFloat(this.data().usage));           // ← missing

  usedPct = computed(() => Math.round((this.usedRAM() / this.totalRAM()) * 100));
}