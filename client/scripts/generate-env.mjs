import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const clientDirectory = dirname(dirname(fileURLToPath(import.meta.url)));
const envFile = join(clientDirectory, '.env');

function readEnvFile(path) {
  try {
    return Object.fromEntries(
      readFileSync(path, 'utf8')
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line && !line.startsWith('#'))
        .map((line) => {
          const separator = line.indexOf('=');
          if (separator < 1) {
            throw new Error(`Invalid environment variable in ${path}: ${line}`);
          }
          return [line.slice(0, separator).trim(), line.slice(separator + 1).trim()];
        }),
    );
  } catch (error) {
    if (error.code === 'ENOENT') {
      return {};
    }
    throw error;
  }
}

const localEnv = readEnvFile(envFile);
const apiUrl = process.env.API_URL || localEnv.API_URL || 'https://mini-os-server.vercel.app';

let parsedApiUrl;
try {
  parsedApiUrl = new URL(apiUrl);
} catch {
  throw new Error('API_URL must be a valid absolute HTTP(S) URL.');
}

if (parsedApiUrl.protocol !== 'http:' && parsedApiUrl.protocol !== 'https:') {
  throw new Error('API_URL must use HTTP or HTTPS.');
}

const output = `window.__env = ${JSON.stringify({ API_URL: apiUrl.replace(/\/+$/, '') })};\n`;
writeFileSync(join(clientDirectory, 'public', 'env.js'), output);
