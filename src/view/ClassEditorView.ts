import { Caret } from "./Caret";
import { SizeTester } from "./SizeTester";
import { TextEditorLine } from "./TextEditorLine";
import { View } from "./View";

const FONT_SIZE = '17px';
const LINE_CHAR_LIMIT = 80;

type Range = { begin: number, end: number };

export class ClassEditorView extends View<'div'> {
    private readonly caret = new Caret();
    private readonly sizeTester = new SizeTester();

    public caretPosition = 0;

    public set text(text: string) {
        this.clearText();
        this.loadText(text);
    }

    private loadText(text: string) {
        this.clearText();
        const textArray = this.textToArray(text);
        const lineViews = this.textArrayToLineViews(textArray);
        this.addLineViewsToView(lineViews);
    }

    private addLineViewsToView(lineViews: TextEditorLine[]) {
        for (const lineView of lineViews)
            this.addChild(lineView);
    }

    private textArrayToLineViews(textArray: string[]): TextEditorLine[] {
        const textEditorLine = [];
        for (const text of textArray)
            textEditorLine.push(new TextEditorLine(text));
        return textEditorLine;
    }

    private clearText() {
        for (const child of this.children)
            this.removeChild(child);
    }
    
    constructor(id?: string) {
        super('div', id, 'class-editor-view');
    }

    private textToArray(text: string): string[] {
        return text.match(/\n|.{1,80}/g) ?? [];
    }
}