import { DataModel } from "../models/DataModel";
import { View } from "../view/View";


export abstract class Controller<M extends DataModel, V extends View<any>> {
    public readonly abstract model: M;
    public readonly abstract view: V;
}