import { Caret } from "./Caret";
import { SizeTester } from "./SizeTester";
import { View } from "./View";

const FONT_SIZE = '17px';
const LINE_CHAR_LIMIT = 80;

const caret = new Caret();
const sizeTester = new SizeTester();

export class ClassEditorView extends View<'div'> {
    private cursorPosition = 0;
    private get currentLine(): number {
        return Math.floor(this.cursorPosition / LINE_CHAR_LIMIT);
    }
    
    constructor(id?: string, className?: string) {
        super('div', id, 'class-editor-view');
        this.el.tabIndex = 0;
        this.el.style.fontSize = FONT_SIZE;
        caret.matchHeight(FONT_SIZE);
        
        this.addEventListener('click', () => {
            this.reloadCursorPosition();
        });

        this.addEventListener('keydown', (ev) => {
            const { key } = ev;
            
            if (key === 'ArrowRight') {
                this.cursorPosition++;
            } else if (key === 'ArrowLeft') {
                this.cursorPosition--;
            } else if (key === 'Backspace') {
                this.content = this.content.substring(0, this.cursorPosition - 1) + this.content.substring(this.cursorPosition);
                this.cursorPosition--;
            } else if (key === 'ArrowDown') {
                this.cursorPosition += LINE_CHAR_LIMIT;
            } else if (key === 'ArrowUp') {
                this.cursorPosition -= LINE_CHAR_LIMIT;
            } else if (key.length === 1) {
                this.content = this.content.substring(0, this.cursorPosition) + key + this.content.substr(this.cursorPosition);
                this.cursorPosition++;
            }

            this.reloadCursorPosition();
        });
    }
    
    reloadCursorPosition() {
        console.log(this.cursorPosition, this.currentLine);
        
        const boundingRect = this.el.getBoundingClientRect();
        const viewOffsetX = boundingRect.left;
        const viewOffsetY = boundingRect.top;

        caret.moveTo(viewOffsetX + this.getLeftPixelSize(), viewOffsetY + this.currentLine * parseInt(FONT_SIZE) + 1);
    }
    getLeftPixelSize() {
        const lineBeginning = this.currentLine * LINE_CHAR_LIMIT;
        return sizeTester.getWidthOf(this.content.substring(lineBeginning, this.cursorPosition));
    }

    get content() {
        return this.el.textContent ?? '';
    }
    set content(content: string) {
        console.log(content);
        
        const splitContent = content.match(/(.|\n){80}|.+/g);

        if (splitContent === null)
            throw new Error('Invalid content');

        const a = Array.from(splitContent)
        
        this.el.innerHTML = '';
        
        a.forEach((e, i) => {
            const el = document.createElement('div');
            el.innerHTML = e;
            el.addEventListener('click', (ev) => {
                console.log(i,'wasclicked');
                
                this.cursorPosition = LINE_CHAR_LIMIT * i;
                
                console.log(this.el.getBoundingClientRect().width + this.getLeftPixelSize(),'<',ev.clientX);
                
                while (this.el.getBoundingClientRect().left + this.getLeftPixelSize() < ev.clientX) {
                    console.log(this.el.getBoundingClientRect().width + this.getLeftPixelSize(),'<',ev.clientX);
                    
                    this.cursorPosition++;
                }

                this.reloadCursorPosition();
            });
            this.el.appendChild(el);        

        });

    }

    get fontSize() {
        return this.el.style.fontSize;
    }
}