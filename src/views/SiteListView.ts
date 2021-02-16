import ElementCreation from '../lib/ElementCreation';
import { SiteView } from './SiteView';
import $ = ElementCreation.$;

class SiteListView {
  public readonly siteListView = document.createElement('div');
  public readonly sites: SiteView[] = [];

  constructor() {
    this.siteListView.className = 'class-assignments';
    this.siteListView.append(
      $('header', '#assignment-header', [
        $('button', '#add-source', '+'),
        $('h1', '#assignment-header-h1', 'Assignments'),
      ]),
      $('ul', '.assignment-sources')
    );

    this.render();
  }

  render() {
    const assignmentSources: HTMLUListElement = this.siteListView.querySelector(
      '.assignment-sources'
    )! as HTMLUListElement;

    assignmentSources.innerHTML = '';

    for (const site of this.sites) {
      assignmentSources.appendChild(site.siteElement);
    }
  }
  addSiteView(view: SiteView) {
    this.sites.push(view);
    this.render();
  }
  attachToDOM(node: Node) {
    node.appendChild(this.siteListView);
  }
}

export default SiteListView;
