import { AddButtonView } from "./AddButtonView";
import { AssignmentListView } from "./AssignmentListView";
import { AssignmentView } from "./AssignmentView";
import { HeaderView } from "./HeaderView";
import { InlineTextView } from "./InlineTextView";
import { View } from "./View";

export class SourceView extends View<'li'> {
    private header: HeaderView;
    private newAssignmentButton: AddButtonView;
    private assignmentName: InlineTextView;
    private assignmentList: AssignmentListView;

    constructor(sourceName: string) {
        super('li', undefined, 'assignment-source');
        this.header = this.addChild(new HeaderView(undefined, 'assignment-source-header'));
        this.newAssignmentButton = this.header
            .addChild(new AddButtonView(undefined, 'new-assignment'));
        this.assignmentName = this.header
            .addChild(new InlineTextView(sourceName, undefined, 'assignment-name'));
        this.assignmentList = this
            .addChild(new AssignmentListView());
    }

    public addAssignment(assignment: AssignmentView) {
        this.assignmentList.addChild(assignment);
    }
    public removeAssignment(assignment: AssignmentView) {
        this.assignmentList.removeChild(assignment);
    }
}