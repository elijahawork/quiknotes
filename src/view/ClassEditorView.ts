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

    private cursorPosition = 0;

    private get heightAboveCursor(): number {
        const lineElementClicked = this.el.children[this.currentLine];
        const lineElementRect = lineElementClicked.getBoundingClientRect();
        return lineElementRect.y;
    }
    private get currentLine(): number {
        const ranges = this.getLineRanges();
        
        const line = ranges.findIndex((range) => range.begin <= this.cursorPosition && this.cursorPosition < range.end);

        if (line === -1)
            throw new RangeError(`Cursor position ${this.cursorPosition} out of bounds. No line matching`);
        
        return line;
    }
    private getLineRanges(): Range[] {
        if (this.children && !this.children.every(child => child instanceof TextEditorLine))
            throw new TypeError('Every child must be of type TextEditorLine');

        const children = this.children as TextEditorLine[];
        const ranges: Range[] = [{ begin: 0, end: children[0].length }];
        
        for (let i = 1; i < children.length; i++) {
            const line = children[i];
            const begin = ranges[i - 1].end;
            const end = begin + line.length;
            const range: Range = { begin, end };
            ranges.push(range);
        }
        
        return ranges;
    }
    private getCharacterCountBehindLineBeginning(line: number): number {
        let index = 0;
        for (let i = 0; i < line; i++)
            index += this.el.children[i].textContent!.length;
        return index;
        
    }
    
    constructor(id?: string) {
        super('div', id, 'class-editor-view');

        this.el.tabIndex = 0;
        this.el.style.fontSize = FONT_SIZE;

        this.caret.matchHeight(parseInt(FONT_SIZE));
        this.sizeTester.alignStyle(this);

        this.addEventListener('keydown', (ev) => {
            const { key } = ev;
            
            if (key === 'ArrowRight') {
                this.moveCaretForward();
            } else if (key === 'ArrowLeft') {
                this.moveCaretBackward();
            } else if (key === 'Backspace') {
                this.removeCharacterBeforeCaret();
            } else if (key === 'ArrowDown') {
                this.moveCaretDown();
            } else if (key === 'ArrowUp') {
                this.moveCaretUp();
            } else if (key.length === 1) {
                this.insertCharacterBeforeCursor(key);
            } else if (key === 'Enter') {
                this.insertCharacterBeforeCursor('\n');
            }

            this.reloadCursorPosition();
        });
    }
    
    private moveCaretDown() {
        this.cursorPosition += LINE_CHAR_LIMIT;
        const end = this.getLineRanges()[this.currentLine].end;
        
        if (this.cursorPosition > end)
            this.cursorPosition -= LINE_CHAR_LIMIT;
    }
    private moveCaretUp() {
        this.cursorPosition -= LINE_CHAR_LIMIT;
        this.cursorPosition = Math.max(this.cursorPosition, 0);
    }
    private moveCaretForward() {
        this.cursorPosition++;
    }
    private moveCaretBackward() {
        this.cursorPosition--;
        this.cursorPosition = Math.max(this.cursorPosition, 0);
    }
    private insertCharacterBeforeCursor(key: string) {
        this.content = this.content.substring(0, this.cursorPosition) + key + this.content.substring(this.cursorPosition);
        this.moveCaretForward();
    }
    private removeCharacterBeforeCaret() {
        this.content = this.content.substring(0, this.cursorPosition - 1) + this.content.substring(this.cursorPosition);
        this.moveCaretBackward();
    }

    private reloadCursorPosition() {
        const boundingRect = this.el.getBoundingClientRect();
        const viewOffsetX = boundingRect.left;
        const viewOffsetY = this.heightAboveCursor;

        const left = this.getWidthOfTextContentBehindCursor();

        const paddedLeft = viewOffsetX + left;
        
        this.caret.moveTo(paddedLeft, viewOffsetY);
    }
    private getWidthOfTextContentBehindCursor() {
        const lineBeginning = this.getLineRanges()[this.currentLine].begin;
        const widthOfLine = this.sizeTester.getWidthOf(this.content.substring(lineBeginning, this.cursorPosition));
        return widthOfLine;
    }
    get content() {
        return this.el.textContent ?? '';
    }
    set content(content: string) {
        const lineContentArray = this.getLineContentArrayFromText(content);
        console.log({lineContentArray});
        
        this.clearContent();
        
        this.loadLinesIntoView(lineContentArray);
    }
    private loadLinesIntoView(lines: string[]) {
        const caret = this.caret;
        lines.forEach((lineContent, lineNumber) => {
            const line = this.addLine(lineContent);
            
            line.addEventListener('mousedown', (ev) => {
                caret.moveTo(this.el.getBoundingClientRect().left, line.top);
                this.cursorPosition = this.getBeginningOfLine(lineNumber);

                while (caret.x < ev.clientX) {
                    this.moveCaretForward();
                    this.reloadCursorPosition();
                }   
            });
        });
    }

    private getBeginningOfLine(lineNumber: number): number {
        return this.getLineRanges()[lineNumber].begin;
    }

    private getLineContentArrayFromText(content: string) {
        const outArray = [''];
        let lineBegin = 0;
        
        for (let i = 0; i < content.length; i++) {
            if (content[i] === '\n') {
                outArray.push('\n');
            } else {
                if (++lineBegin <= 80 && outArray[outArray.length - 1] !== '\n') {
                    outArray[outArray.length - 1] += content[i];
                } else {
                    lineBegin = 0;
                    outArray.push(content[i]);
                }
            }
        }

        return outArray;
    }

    private addLine(text: string): TextEditorLine {
        const line = new TextEditorLine(text);
        this.addChild(line);
        return line;
    }

    private clearContent() {
        this.el.innerHTML = '';
    }

    get fontSize() {
        return this.el.style.fontSize;
    }
}