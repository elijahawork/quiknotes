import { ClassContentModel } from "../models/ClassContentModel";
import { ClassEditorView } from "../view/ClassEditorView";
import { Controller } from "./Controller";

export class ClassContentController extends Controller<ClassContentModel, ClassEditorView> {
    constructor(model: ClassContentModel, view: ClassEditorView) {
        super(model, view);

        this.setText(model.content);
        
        this.addViewMoveEvents(view, model);
    }

    private addViewMoveEvents(view: ClassEditorView, model: ClassContentModel) {
        view.addEventListener('keydown', (event) => {
            const { key } = event;
            const { content } = model;
            const { caretPosition } = view;
            const newContent = content.substring(0, caretPosition) + key + content.substring(caretPosition);
            this.setText(newContent);
        });
    }

    private setText(newContent: string) {
        this.model.content = newContent;
        this.view.text = newContent;
    }
}