export function addStyle(e: HTMLElement, d: Object) {
  for (const [key, value] of Object.entries(d)) {
    const t = key as unknown as any; //TODO: Element implicitly has an 'any' type because index expression is not of type 'number'.
    e.style[t] = value;
  };
};