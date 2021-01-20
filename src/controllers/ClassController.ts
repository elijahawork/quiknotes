import { ClassModel } from "../models/ClassModel";
import { ClassEditorView } from "../view/ClassEditorView";
import { Controller } from "./Controller";

export class ClassController extends Controller<ClassModel, ClassEditorView> {
    public readonly model: ClassModel;
    public readonly view: ClassEditorView;

    constructor(model: ClassModel, view: ClassEditorView) {
        super();
        this.model = model;
        this.view = view;

        this.view.content = model.content;

        // this.view.addEventListener('keyup', (ev) => {
        //     const { key } = ev;


        //     // if (key === '#') {
        //     //     model.content = model.content + 
        //     // }

        //     model.content = this.view.content;
        //     model.writeContent();
        // });
    }
}