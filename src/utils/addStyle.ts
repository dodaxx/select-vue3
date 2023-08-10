export function addStyle(e: HTMLElement, d: Object) {
  for (const [key, value] of Object.entries(d)) {
    const t = key as keyof typeof d;
    e.style[t] = value;
  };
};