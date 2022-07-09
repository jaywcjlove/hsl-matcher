const MATCHER =
  /hsla?\(\s*(\+?-?\d+\.?\d+(?:e\+)?(\d+)?(?:deg|rad|grad|turn)?)\s*,\s*(\+?\-?\d+\.?\d*?%)\s*,\s*(\+?\-?\d+\.?\d*?%)\s*(,\s*?\d*%|,\s*\+?-?\d*\.?\d*)?\s*\)/i;
// hsl(.9, .99%, .999%)             // ✅✅✅✅
// hsl(.9, .99%, .999%, .9999)      // fraction w/o leading zero
const MATCHER2 = /hsla?\(\s*(\.\d*)\s*,\s*(\.\d*%)\s*,\s*(\.\d*%)\s*(,\s*\.\d*\s*)?\)/i;
// hsl(240 100% 50%)                // ✅✅✅✅
// hsl(240 100% 50% / 0.1)          // space separated with opacity
const MATCHER3 = /hsla?\(\s*(\d*)\s\s*(\d*%)\s\s*(\d*%)\s*(\/\s*\d*.\d*\s*)?\)/i;
// hsl(2.40e+2, 1.00e+2%, 5.00e+1%, 1E-3)
const MATCHER4 = /hsla?\(\s*(\d*.\d*e\+\d*)\s*,\s*(\d*.\d*e\+\d*%),\s*(\d*.\d*e\+\d*%)\s*(,\s*\d*E-\d*)?/i;

const aStr = (a?: string) => (a ? a.replace(/^(,|\/)\s*/, '').trim() : a);

export interface RGBColor {
  r: number;
  g: number;
  b: number;
}

export interface RGBAColor extends RGBColor {
  a: number;
}

export interface HSLObjectStringColor {
  h: string;
  s: string;
  l: string;
}

export interface HSLAObjectStringColor extends HSLObjectStringColor {
  a?: string;
}

/** Convert HLS string to HLS object or verify whether hls is valid */
export default function hslMatcher(hsl: string = ''): boolean | HSLAObjectStringColor {
  const match = MATCHER.exec(hsl);
  if (!!match) {
    const [_, h, __, s, l, a] = match;
    return {
      h,
      s,
      l,
      a: aStr(a),
    };
  }
  const match2 = MATCHER2.exec(hsl);
  const match3 = MATCHER3.exec(hsl);
  const match4 = MATCHER4.exec(hsl);
  const arr = match2 || match3 || match4;
  if (!!arr) {
    const [_, h, s, l, a] = arr;
    return {
      h,
      s,
      l,
      a: aStr(a),
    };
  }
  return false;
}

/**
 * Convert HSL String to RGB
 *
 * ```js
 * hsl(240, 100%, 50%)                         // ✅ comma separated
 * hsl(240, 100%, 50%, 0.1)                    // ✅ comma separated with opacity
 * hsl(240, 100%, 50%, 10%)                    // ✅ comma separated with % opacity
 * hsl(240, 100%, 50%, 10x)                    // ❌
 * hsl(240,100%,50%,0.1)                       // ✅ comma separated without spaces
 * hsl(180deg, 100%, 50%, 0.1)                 // ✅ hue with 'deg'
 * hsl(3.14rad, 100%, 50%, 0.1)                // ✅ hue with 'rad'
 * hsl(200grad, 100%, 50%, 0.1)                // ✅ hue with 'grad'
 * hsl(0.5turn, 100%, 50%, 0.1)                // ✅ hue with 'turn'
 * hsl(-240, -100%, -50%, -0.1)                // ✅ negative values
 * hsl(+240, +100%, +50%, +0.1)                // ✅ explicit positive sign
 * hsl(240.5, 99.99%, 49.999%, 0.9999)         // ✅ non-integer values
 * hsl(.9, .99%, .999%, .9999)                 // ✅ fraction w/o leading zero
 * hsl(.9, .99%, .999%, )                      // ❌
 * hsl(0240, 0100%, 0050%, 01)                 // ✅ leading zeros
 * hsl(240.0, 100.00%, 50.000%, 1.0000)        // ✅ trailing decimal zeros
 * hsl(2400, 1000%, 1000%, 10)                 // ✅ out of range values
 * hsl(-2400.01deg, -1000.5%, -1000.05%, -100) // ✅ combination of above
 * hsl(2.40e+2, 1.00e+2%, 5.00e+1%, 1E-3)      // ✅ scientific notation
 * hsl(240 100% 50%)                           // ✅ space separated (CSS Color Level 4)
 * hsl(240 100% 50% / 0.1)                     // ✅ space separated with opacity
 * hsla(240, 100%, 50%)                        // ✅ hsla() alias
 * hsla(240, 100%, 50%, 0.1)                   // ✅ hsla() with opacity
 * HSL(240Deg, 100%, 50%)                      // ✅ case insensitive
 * ```
 *
 * @param string
 * @returns <RGBColor | undefined>
 *
 * https://www.30secondsofcode.org/js/s/hsl-to-rgb
 */
export function hlsStringToRGB(hls: string): RGBColor | undefined {
  const obj = hslMatcher(hls);
  if (typeof obj === 'boolean') return;
  const { h: hStr, s: sStr, l: lStr } = obj;
  let h = 0,
    s = 0,
    l = 0;

  if (/\s*\d*turn\s*$/.test(hStr)) {
    h = Number(hStr.replace(/turn\s*$/i, '')) * 360;
  } else if (/\s*\d*grad\s*$/.test(hStr)) {
    h = gradsToDegrees(hStr.replace(/grad\s*$/i, ''));
  } else if (/\s*\d*rad\s*$/.test(hStr)) {
    h = radiansToDegrees(Number(hStr.replace(/rad\s*$/i, '')));
  }

  if (/^((-|\+)?\d*|(-|\+)?\d*?.\d*(e\+)?\d*?)$/.test(hStr.replace(/deg$/i, ''))) {
    h = Number(hStr.replace(/deg$/i, ''));
  }
  if (h > 360) h = 360;
  if (h < 0) h = 0;
  if (/^((-|\+)?\d*|(-|\+)?\d*?.\d*(e\+)?\d*?)%$/.test(sStr)) {
    s = Number(sStr.replace(/%$/, ''));
  }
  if (s > 100) s = 100;
  if (s < 0) s = 0;
  if (/^((-|\+)?\d*|(-|\+)?\d*?.\d*(e\+)?\d*?)%$/.test(lStr)) {
    l = Number(lStr.replace(/%$/, ''));
  }
  if (l > 100) l = 100;
  if (l < 0) l = 0;

  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return { r: 255 * f(0), g: 255 * f(8), b: 255 * f(4) };
}

/** Convert `grad` to `deg` */
export function gradsToDegrees(input: string | number) {
  let grads = Number(input);

  grads = grads % 400;
  if (grads < 0) {
    grads += 400;
  }
  // or grads = grads < 0 ? 400 + grads : grads;
  let degrees = (grads / 400) * 360; //or let degrees = grads*0.9
  return degrees;
}

/** Convert `rad` to `deg` */
export function radiansToDegrees(radians: number) {
  return Number((radians * (180 / Math.PI)).toFixed());
}