import * as migration_20260713_083256 from './20260713_083256';
import * as migration_20260715_011127 from './20260715_011127';

export const migrations = [
  {
    up: migration_20260713_083256.up,
    down: migration_20260713_083256.down,
    name: '20260713_083256',
  },
  {
    up: migration_20260715_011127.up,
    down: migration_20260715_011127.down,
    name: '20260715_011127'
  },
];
