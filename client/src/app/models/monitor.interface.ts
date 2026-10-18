export interface CpuData {
  model: string;
  manufacture: string;
  cores: string;
  speed: string;
  usage: string;
}

export interface MemoryData {
  totalRAM: string;
  usedRAM: string;
  freeRAM: string;
  usage: string;
}

export interface ProcessData {
  pid: number;
  name: string;
  cpu: string;
  memory: string;
}

