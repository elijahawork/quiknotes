import ElementCreation from '../lib/ElementCreation';
import $ = ElementCreation.$;

export class AssignmentView {
  private _name!: string;
  private _date!: Date;

  public readonly assignmentElement: HTMLLIElement = $('li');

  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
    this.render();
  }
  public get date(): Date {
    return this._date;
  }
  public set date(value: Date) {
    this._date = value;
    this.render();
  }

  constructor(name: string, date: Date) {
    this.name = name;
    this.date = date;
    this.assignmentElement.className = 'assignment';
    this.render();
  }

  render() {
    this.assignmentElement.innerHTML = `
      <span class="assignment-name">
        Unit I Essay
      </span>
      <span class="assignment-due soon">
        DUE IN 2 DAYS
      </span>
    `;
  }
}
