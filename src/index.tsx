import { join } from 'path';
import React from 'react';
import ReactDOM from 'react-dom';
import { ClassModel } from './models/ClassModel';
import App from './view/App';
export const __PROJ_NAME = join(__dirname, 'protected');

export const CLASS_LIST: ClassModel[] = [];

function test() {}
function init() {
  const root = document.getElementById('root')!;
  const app = <App classes={CLASS_LIST} />;

  ReactDOM.render(app, root);
}
export function main() {
  test();
  init();
}
