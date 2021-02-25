import { join } from 'path';
import React from 'react';
import ReactDOM from 'react-dom';
import { ClassModel } from './models/ClassModel';
import App from './view/App';
export const __PROJ_NAME = join(__dirname, '..', '..', 'protected');

export const CLASS_LIST: ClassModel[] = [];

const root = document.getElementById('root')!;
export const app = <App classes={CLASS_LIST} />;

function parseClassList() {}

function test() {}
function init() {
  ReactDOM.render(app, root);
}
export function main() {
  test();
  init();
}
