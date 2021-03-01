import { readdirSync } from 'fs';
import { join, parse } from 'path';
import React from 'react';
import ReactDOM from 'react-dom';
import { AssignmentModel } from './models/AssignmentModel';
import { ClassModel } from './models/ClassModel';
import App from './view/App';
export const __PROJ_NAME = join(__dirname, '..', 'protected');

export const CLASS_LIST: ClassModel[] = [];

const root = document.getElementById('root')!;

function populateListings() {
  const dir = readdirSync(__PROJ_NAME);
  for (const file of dir) {
    const { ext, name } = parse(file);

    switch (ext) {
      case ClassModel.EXT:
        {
          const classModel = ClassModel.fromPath(parseInt(name));
          CLASS_LIST.push(classModel);
        }
        break;
      case AssignmentModel.EXT:
        {
          // create the assignment in the registry
          AssignmentModel.fromPath(parseInt(name));
        }
    }
  }
}

export const app = (populateListings(), (<App classes={CLASS_LIST} />));

function test() {}
function init() {
  ReactDOM.render(app, root);
}
export function main() {
  test();
  init();
}
