namespace ElementCreation {
  export function $<T extends keyof HTMLElementTagNameMap>(
    tagName: T
  ): HTMLElementTagNameMap[T];
  export function $<T extends keyof HTMLElementTagNameMap>(
    tagName: T,
    selectors: string
  ): HTMLElementTagNameMap[T];
  export function $<T extends keyof HTMLElementTagNameMap>(
    tagName: T,
    text: string
  ): HTMLElementTagNameMap[T];
  export function $<T extends keyof HTMLElementTagNameMap>(
    tagName: T,
    children: HTMLElement[]
  ): HTMLElementTagNameMap[T];
  export function $<T extends keyof HTMLElementTagNameMap>(
    tagName: T,
    selectors: string,
    children: HTMLElement[]
  ): HTMLElementTagNameMap[T];
  export function $<T extends keyof HTMLElementTagNameMap>(
    tagName: T,
    selectors: string,
    text: string
  ): HTMLElementTagNameMap[T];
  export function $<T extends keyof HTMLElementTagNameMap>(
    tagName: T,
    text: string,
    children: HTMLElement[]
  ): HTMLElementTagNameMap[T];

  export function $<T extends keyof HTMLElementTagNameMap>(
    tagName: T,
    selectorsOrTextOrChildren?: string | HTMLElement[],
    childrenOrText?: HTMLElement[] | string
  ): HTMLElementTagNameMap[T] {
    const e = document.createElement(tagName);

    let predicate1IsSelector = false;

    if (typeof selectorsOrTextOrChildren === 'string') {
      if (
        selectorsOrTextOrChildren[0] === '#' ||
        selectorsOrTextOrChildren[0] === '.'
      ) {
        predicate1IsSelector = true;
        applySelector(e, selectorsOrTextOrChildren);
      } else {
        e.innerText = selectorsOrTextOrChildren;
      }
    } else if (selectorsOrTextOrChildren instanceof Array) {
      e.append(...selectorsOrTextOrChildren);
    }

    if (childrenOrText instanceof Array) {
      e.append(...childrenOrText);
    } else if (typeof childrenOrText === 'string') {
      if (!predicate1IsSelector)
        throw new TypeError(`Cannot have two innertexts`);
      e.innerText = childrenOrText;
    }

    return e;
  }

  function applySelector(element: HTMLElement, selector: string) {
    const selectors = selector.match(/#[^ .]+|(\.[^ .]+)/g);

    selectors?.forEach((selector) => {
      switch (selector[0]) {
        case '#':
          element.id = selector.substring(1);
          break;
        case '.':
          element.classList.add(selector.substring(1));
          break;
      }
    });
  }
}
export default ElementCreation;
