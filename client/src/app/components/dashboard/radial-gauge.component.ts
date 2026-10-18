import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-radial-gauge',
  standalone: true,
  template: `
    <div class="gauge" [style.--size.px]="size()">
      <svg [attr.viewBox]="'0 0 120 120'">
        <circle class="gauge__track" cx="60" cy="60" r="52" />
        <circle
          class="gauge__fill"
          cx="60" cy="60" r="52"
          [style.stroke]="color()"
          [style.stroke-dasharray]="circumference"
          [style.stroke-dashoffset]="offset()"
        />
      </svg>
      <div class="gauge__readout">
        <span class="gauge__value">{{ value() }}<small>%</small></span>
        <span class="gauge__label">{{ label() }}</span>
      </div>
    </div>
  `,
  styles: [`
    .gauge { position: relative; width: var(--size); height: var(--size); }
    svg { width: 100%; height: 100%; transform: rotate(-90deg); }
    .gauge__track {
      fill: none; stroke: #1C2330; stroke-width: 8;
    }
    .gauge__fill {
      fill: none; stroke-width: 8; stroke-linecap: round;
      transition: stroke-dashoffset 700ms cubic-bezier(.4,0,.2,1), stroke 400ms ease;
    }
    .gauge__readout {
      position: absolute; inset: 0; display: flex; flex-direction: column;
      align-items: center; justify-content: center; gap: 2px;
    }
    .gauge__value {
      font-family: 'JetBrains Mono', monospace;
      font-size: 1.6rem; font-weight: 600; color: #E8ECF1;
      letter-spacing: -0.02em;
    }
    .gauge__value small { font-size: .9rem; color: #8B95A7; margin-left: 2px; }
    .gauge__label {
      font-family: 'Space Grotesk', sans-serif;
      font-size: .65rem; letter-spacing: .12em; text-transform: uppercase;
      color: #8B95A7;
    }
      /* radial-gauge.component.ts styles (or .css if you split it out) */
.gauge__value {
  font-size: 2.1rem; /* was 1.6rem */
}

.gauge__value small {
  font-size: 1.1rem; /* was .9rem */
}

.gauge__label {
  font-size: .8rem; /* was .65rem */
}
  `]
})
export class RadialGaugeComponent {
  value = input.required<number>();
  label = input<string>('');
  size = input<number>(140);

  readonly circumference = 2 * Math.PI * 52;

  offset = computed(() => {
    const pct = Math.min(Math.max(this.value(), 0), 100);
    return this.circumference - (pct / 100) * this.circumference;
  });

  color = computed(() => {
    const v = this.value();
    if (v >= 85) return '#FB7185';
    if (v >= 60) return '#FBBF24';
    return '#5EEAD4';
  });
}