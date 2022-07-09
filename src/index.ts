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

export default function hslMatcher(hsl: string = '') {
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
