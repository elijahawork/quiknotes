import ElementCreation from '../lib/ElementCreation';
import { ISiteSchema } from '../schema/ISiteSchema';
import { AssignmentView } from './AssignmentView';
import $ = ElementCreation.$;

export class SiteView {
  public readonly siteElement: HTMLLIElement = $('li', '.assignment-source');
  public readonly addAssignmentButton: HTMLButtonElement = $(
    'button',
    '.new-assignment',
    '+'
  );
  // rerender after changing
  public assignments: AssignmentView[] = [];
  private _site!: ISiteSchema;
  public get site(): ISiteSchema {
    return this._site;
  }
  public set site(value: ISiteSchema) {
    this._site = value;
    this.render();
  }
  constructor(site: ISiteSchema) {
    this._site = site;

    this.siteElement.append(
      $('header', '.assignment-source-header', [
        this.addAssignmentButton,
        $('span', '.assignment-name', this.site.name),
      ]),
      $('ul', '.assignments')
    );

    this.render();
  }

  render() {
    const assignmentName = this.siteElement.querySelector('.assignment-name')!;
    const assignments = this.siteElement.querySelector('.assignments')!;
    assignmentName.innerHTML = this.site.name;
    assignments.innerHTML = '';
    assignments.append(...this.getAssignmentViewsAsHTMLElements());
  }

  private getAssignmentViewsAsHTMLElements(): HTMLLIElement[] {
    return this.assignments.map((assignment) => assignment.assignmentElement);
  }
}
