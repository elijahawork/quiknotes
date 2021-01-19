import { View } from "./View";

export class AssignmentListView extends View<'ul'> {
    constructor() {
        super('ul', undefined, 'assignments');
    }
}