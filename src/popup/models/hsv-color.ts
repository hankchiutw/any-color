import chroma from 'chroma-js';

interface ColorChannel {
  h?: number;
  s?: number;
  v?: number;
  a?: number;
}

export class HSVColor {
  public static create(h: number, s: number, v: number, a = 1) {
    return new HSVColor(h, s, v, a);
  }

  private h: number;
  private s: number;
  private v: number;
  private a = 1;
  private color: chroma.Color;

  constructor(h: number, s: number, v: number, a: number) {
    this.h = h;
    this.s = s;
    this.v = v;
    this.a = a;
    this.color = chroma.hsv(h, s, v).alpha(a);
  }

  public get hsv() {
    return {
      h: this.h,
      s: this.s,
      v: this.v,
    };
  }

  public get alpha() {
    return this.a;
  }

  public clone({
    h = this.h,
    s = this.s,
    v = this.v,
    a = this.a,
  }: ColorChannel = {}): HSVColor {
    return HSVColor.create(h, s, v, a);
  }

  public css(): string {
    return this.color.css();
  }

  public hueCss(): string {
    return chroma.hsv(this.h, 1, 1).css();
  }

  public rgbCss(): string {
    return this.color.alpha(1).css();
  }
}
