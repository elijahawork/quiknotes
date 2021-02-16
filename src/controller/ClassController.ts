import { ClassModel } from '../models/ClassModel';
import { IAssignmentSchema } from '../schema/IAssignmentSchema';
import { ISiteSchema } from '../schema/ISiteSchema';
import { AssignmentView } from '../views/AssignmentView';
import SiteListView from '../views/SiteListView';
import { SiteView } from '../views/SiteView';

class ClassController {
  private readonly model: ClassModel;
  private readonly view: SiteListView;

  /**
   * @warning do not modify model and view with their methods. It won't update its corrosponding component.
   * @param model DataModel for controller
   * @param view Site Listing (Assignments View)
   */
  private constructor(model: ClassModel, view: SiteListView) {
    this.model = model;
    this.view = view;

    for (const site of this.model.getSiteList()) {
      this.view.addSiteView(new SiteView(site));
    }

    this.view.render();

    this.view.siteListView
      .querySelector('#add-source')!
      .addEventListener('click', () => {
        this.addSite({
          name: 'Google Classroom',
          url: 'https://classroom.google.com/statistics',
        });
      });
  }

  /**
   * @warning do not modify model and view with their methods. It's not reactive.
   * @param model Model to make from
   * @param view View to make from
   */
  public static makeControllerFromModelAndView(
    model: ClassModel,
    view: SiteListView
  ): ClassController {
    return new ClassController(model, view);
  }
  /**
   * @description Will create the view
   */
  public static makeControllerFromModel(model: ClassModel): ClassController {
    return new ClassController(model, new SiteListView());
  }
  /**
   * @description Will create both the model and the view using provided model arguments
   */
  public static makeNewControllerFromClassName(
    className: string,
    classContent?: string
  ): ClassController {
    return new ClassController(
      new ClassModel(className, classContent),
      new SiteListView()
    );
  }
  private addSite(site: ISiteSchema) {
    this.model.addSite(site);
    const siteView = new SiteView(site);
    this.view.addSiteView(siteView);
    

    siteView.addAssignmentButton.addEventListener('click', () => {
      this.addAssignment({
        date: new Date(),
        name: 'Assignment',
        site: site,
      });
    });
  }
  private addAssignment(assignment: IAssignmentSchema) {
    

    this.model.addAssignment(assignment);
    const assignmentView = new AssignmentView(assignment.name, assignment.date);
    

    

    const targetSiteView = this.view.sites.find(
      (site) => site.site.name === assignment.site.name
    );

    targetSiteView?.assignments.push(assignmentView);
    targetSiteView?.render();
  }

  public attachToDOMNode(node: Node) {
    this.view.attachToDOM(node);
    this.view.render();
  }
}

export default ClassController;
