import { Component, input, computed } from '@angular/core';
import { CpuData } from '../../../../models/monitor.interface';
import { RadialGaugeComponent } from '../../radial-gauge.component';

@Component({
  selector: 'app-cpu-monitor',
  imports: [RadialGaugeComponent],
  templateUrl: './cpu-monitor.html',
  styleUrl: './cpu-monitor.css',
})
export class CpuMonitor {
  data = input.required<CpuData>();

  usage = computed(() => parseFloat(this.data().usage)); // ← was missing, your html calls usage()

  statusLabel = computed(() => {
    const u = this.usage();
    if (u >= 85) return 'CRITICAL LOAD';
    if (u >= 60) return 'ELEVATED LOAD';
    return 'NOMINAL';
  });
}