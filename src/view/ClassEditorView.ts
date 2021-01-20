import { Caret } from "./Caret";
import { SizeTester } from "./SizeTester";
import { View } from "./View";

const FONT_SIZE = '17px';
const LINE_CHAR_LIMIT = 80;

const caret = new Caret();
const sizeTester = new SizeTester();

export class ClassEditorView extends View<'div'> {
    private cursorPosition = 0;

    private get heightAboveCursor(): number {
        const clicked = this.el.children[this.currentLine];
        console.log(clicked);
        
        const lineElementRect = clicked.getBoundingClientRect();
        console.log(lineElementRect);
        
        return lineElementRect.y;
    }
    private get currentLine(): number {
        return Math.floor(this.cursorPosition / LINE_CHAR_LIMIT);
    }
    
    constructor(id?: string) {
        super('div', id, 'class-editor-view');
        this.el.tabIndex = 0;
        this.el.style.fontSize = FONT_SIZE;
        caret.matchHeight(parseInt(FONT_SIZE));
        
        // this.addEventListener('mousedown', () => {
        //     this.reloadCursorPosition();
        // });

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
                this.moveCaretDown();
            }

            this.reloadCursorPosition();
        });
    }
    
    private moveCaretDown() {
        this.cursorPosition += LINE_CHAR_LIMIT;
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
        this.content = this.content.substring(0, this.cursorPosition) + key + this.content.substr(this.cursorPosition);
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

        caret.moveTo(viewOffsetX + this.getLeftPixelSize(), viewOffsetY);
    }
    private getLeftPixelSize() {
        const lineBeginning = this.currentLine * LINE_CHAR_LIMIT;
        sizeTester.alignStyle(this);
        return sizeTester.getWidthOf(this.content.substring(lineBeginning, this.cursorPosition));
    }

    get content() {
        return this.el.textContent ?? '';
    }
    set content(content: string) {
        const splitContent = content.match(/\n|(.){80}|.+/g) ?? [''];

        const lines = Array.from(splitContent)
        
        this.clearContent();
        
        lines.forEach((lineContent, index) => {
            const line = document.createElement('div');
            line.innerHTML = lineContent;
            this.el.appendChild(line);

            line.addEventListener('mousedown', (ev) => {
                this.cursorPosition = LINE_CHAR_LIMIT * index;
                
                while (this.el.getBoundingClientRect().left + this.getLeftPixelSize() < ev.clientX) {
                    this.moveCaretForward();
                }

                this.reloadCursorPosition();
            });

        });

    }

    private clearContent() {
        this.el.innerHTML = '';
    }

    get fontSize() {
        return this.el.style.fontSize;
    }
}