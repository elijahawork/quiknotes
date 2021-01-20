import { ClassEditorView } from "./ClassEditorView";
import { View } from "./View";

export class SizeTester extends View<'span'> {
    private isBold = false;
    private isItalics = false;
    private isUnderline = false;

    constructor() {
        super('span', undefined, 'size-tester');
        this.attachToHTMLElement(document.body);
    }
    
    public getWidthOf(text: string) {
        this.el.textContent = text;
        return this.el.getBoundingClientRect().width;
    }
    public alignStyle(view: ClassEditorView) {
        this.el.style.fontSize = view.fontSize;
    }
    public bold() {
        this.isBold = !this.isBold;
        this.el.style.fontWeight = this.isBold ? 'bold' : 'none';
    }
    public italics() {
        this.isItalics = !this.isItalics;
        this.el.style.textEmphasis = this.isItalics ? 'italics' : 'none';
    }
    public underline() {
        this.isUnderline = !this.isUnderline;
        this.el.style.textDecoration = this.isUnderline ? 'underline' : 'none';
    }
}