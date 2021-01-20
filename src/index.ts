import { join } from "path";
import { ClassController } from "./controllers/ClassController";
import { ClassModel } from "./models/ClassModel";
import { AssignmentView } from "./view/AssignmentView";
import { ClassEditorView } from "./view/ClassEditorView";
import { SourceView } from "./view/SourceView";

export const __PROJ_NAME = join(__dirname, 'protected');

function test() {
    const sview = new SourceView('Pearson');
    
    sview.attachToHTMLElement(document
        .getElementsByClassName('assignment-sources')[0] as HTMLElement);
        
    console.log(sview);
    
    const assignment1 = new AssignmentView('Unit I Essay', 'DUE SOON', undefined, 'soon');
    const assignment2 = new AssignmentView('Unit II Essay', 'DUE IN 6 DAYS', undefined, 'far');
    
    sview.addAssignment(assignment1);
    sview.addAssignment(assignment2);

    const sview2 = new SourceView('Google Classroom');

    sview2.attachToHTMLElement(document
        .getElementsByClassName('assignment-sources')[0] as HTMLElement);
    
    const assignment3 = new AssignmentView('Unit I Essay', 'DUE SOON', undefined, 'soon');
    const assignment4 = new AssignmentView('Unit II Essay', 'DUE IN 6 DAYS', undefined, 'far');
    sview2.addAssignment(assignment3);
    sview2.addAssignment(assignment4);

    const classModel = ClassModel.fromPath(0);
    const classView = new ClassEditorView('notes');
    const controller = new ClassController(classModel, classView);
    classView.attachToHTMLElement(document.getElementById('class-notes')!);
}
function init() {

}
export function main() {
    test();
    init();
}