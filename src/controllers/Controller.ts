import { DataModel } from "../models/DataModel";
import { View } from "../view/View";


export abstract class Controller<M extends DataModel, V extends View<any>> {
    public readonly model: M;
    public readonly view: V;
    constructor(model: M, view: V) {
        this.model = model;
        this.view = view;
    }
}