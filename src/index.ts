import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

export const __PROJ_NAME = join(__dirname, 'protected');

function test() {
  if (!existsSync(__PROJ_NAME)) mkdirSync(__PROJ_NAME);
}
function init() {}
export function main() {
  test();
  init();
}
