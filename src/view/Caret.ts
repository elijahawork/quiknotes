import { View } from "./View";

export class Caret extends View<'div'> {
    constructor() {
        super('div', undefined, 'caret');
        this.attachToHTMLElement(document.body);
    }
    public moveTo(x: number, y: number) {
        this.el.style.left = `${x}px`;
        this.el.style.top = `${y}px`;
    }
    public matchHeight(px: number) {
        this.el.style.height = `${px}px`;
    }
    get x() {
        console.log(this.el.getBoundingClientRect());
        
        return this.el.getBoundingClientRect().left; 
    }
    get y() {
        return this.el.getBoundingClientRect().top; 
    }
}