import { Caret } from "./Caret";
import { SizeTester } from "./SizeTester";
import { View } from "./View";

const FONT_SIZE = '20px';
const LINE_CHAR_LIMIT = 80;

const caret = new Caret();
const sizeTester = new SizeTester();

export class ClassEditorView extends View<'div'> {
    private cursorPosition = 0;
    private currentLine = 0;
    private indexLineBefore = 0;

    constructor(id?: string, className?: string) {
        super('div', id, 'class-editor-view');
        this.el.tabIndex = 0;
    }
    
    reloadCursorPosition() {
        if (this.cursorPosition % LINE_CHAR_LIMIT === 0) {
            this.currentLine++;
        }
        const viewOffset = this.el.getBoundingClientRect().left;
        caret.moveTo(viewOffset + this.getLeftPixelSize(), this.currentLine * parseInt(FONT_SIZE));
    }
    getLeftPixelSize() {
        const lineBeginning = this.currentLine * LINE_CHAR_LIMIT;
        return sizeTester.getWidthOf(this.content.substring(lineBeginning, this.cursorPosition));
    }

    get content() {
        return this.el.textContent ?? '';
    }
    set content(content: string) {
        this.el.textContent = content;
    }

    get fontSize() {
        return this.el.style.fontSize;
    }
}