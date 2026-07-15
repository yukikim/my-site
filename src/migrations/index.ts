import * as migration_20260713_083256 from './20260713_083256';
import * as migration_20260715_011127 from './20260715_011127';
import * as migration_20260715_022316_enable_page_drafts from './20260715_022316_enable_page_drafts';

export const migrations = [
  {
    up: migration_20260713_083256.up,
    down: migration_20260713_083256.down,
    name: '20260713_083256',
  },
  {
    up: migration_20260715_011127.up,
    down: migration_20260715_011127.down,
    name: '20260715_011127',
  },
  {
    up: migration_20260715_022316_enable_page_drafts.up,
    down: migration_20260715_022316_enable_page_drafts.down,
    name: '20260715_022316_enable_page_drafts'
  },
];
