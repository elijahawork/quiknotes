import { ClassModel } from "../models/ClassModel";
import { SourceView } from "../view/SourceView";
import { Controller } from "./Controller";

export class SourceController extends Controller<ClassModel, SourceView> {
    public readonly model: ClassModel;
    public readonly view: SourceView;
    
    constructor(model: ClassModel, view: SourceView) {
        super();
        this.model = model;
        this.view = view;
    }
}