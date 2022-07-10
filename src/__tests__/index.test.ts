import hslMatcher, { hlsStringToRGB, gradsToDegrees, radiansToDegrees } from '..';

it('=> gradsToDegrees("200")', () => expect(gradsToDegrees('200')).toEqual(180));
it('=> gradsToDegrees(200)', () => expect(gradsToDegrees(200)).toEqual(180));
it('=> gradsToDegrees(-200)', () => expect(gradsToDegrees(200)).toEqual(180));
it('=> gradsToDegrees(+200)', () => expect(gradsToDegrees(200)).toEqual(180));
it('=> radiansToDegrees(3.14)', () => expect(radiansToDegrees(3.14)).toEqual(180));
it('=> hsl() ❌ ', () => expect(hslMatcher('')).toBeUndefined());
it('=> hsl() ❌ ', () => expect(hslMatcher('hsl()')).toBeUndefined());
it('=> hsl("") ❌ ', () => expect(hslMatcher('hsl("")')).toBeUndefined());
it('=> hsl("~~~~") ❌ ', () => expect(hslMatcher('hsl("~~~")')).toBeUndefined());
it('=> hsl(240, 100%, 50%, 23x) ❌ ', () => expect(hslMatcher('hsl(240, 100%, 50%, 23x)')).toBeUndefined());
it('=> hsl(.9 .99% .999%/ ) ❌ ', () => expect(hslMatcher('hsl(.9 .99% .999%/ )')).toBeUndefined());
it('=> hsl(.9 .99% .999%, ) ❌ ', () => expect(hslMatcher('hsl(.9 .99% .999%, )')).toBeUndefined());
it('=> hsl(.9, .99% .999% ) ❌ ', () => expect(hslMatcher('hsl(.9, .99% .999% )')).toBeUndefined());

it('=> hsl(.9, .99%, -.999% ) ✅ ', () =>
  expect(hslMatcher('hsl(.9, .99%, -.999% )')).toEqual({
    h: '.9',
    s: '.99%',
    l: '-.999%',
    a: undefined,
  }));

it('=> hsl(240, 100%, 50% ) ✅ ', () =>
  expect(hslMatcher('hsl(240, 100%, 50% )')).toEqual({
    h: '240',
    s: '100%',
    l: '50%',
    a: undefined,
  }));

it('=> hsl(240, 100%, 50%, 0.1) ✅ ', () =>
  expect(hslMatcher('hsl(240, 100%, 50%, 0.1)')).toEqual({
    a: '0.1',
    l: '50%',
    h: '240',
    s: '100%',
  }));

it('=> hsl(240, 100%, 50%, 10%) ✅ ', () =>
  expect(hslMatcher('hsl(240, 100%, 50%, 10%)')).toEqual({
    a: '10%',
    l: '50%',
    h: '240',
    s: '100%',
  }));

it('=> hsl(240,100%,50%,0.1) ✅ ', () =>
  expect(hslMatcher('hsl(240,100%,50%,0.1)')).toEqual({
    a: '0.1',
    l: '50%',
    h: '240',
    s: '100%',
  }));

it('=> hsl(180deg, 100%, 50%, 0.1) ✅ ', () =>
  expect(hslMatcher('hsl(180deg, 100%, 50%, 0.1)')).toEqual({
    a: '0.1',
    l: '50%',
    h: '180deg',
    s: '100%',
  }));

it('=> hsl(3.14rad, 100%, 50%, 0.1) ✅ ', () =>
  expect(hslMatcher('hsl(3.14rad, 100%, 50%, 0.1)')).toEqual({
    a: '0.1',
    l: '50%',
    h: '3.14rad',
    s: '100%',
  }));

it('=> hsl(200grad, 100%, 50%, 0.1) ✅ ', () =>
  expect(hslMatcher('hsl(200grad, 100%, 50%, 0.1)')).toEqual({
    a: '0.1',
    l: '50%',
    h: '200grad',
    s: '100%',
  }));

it('=> hsl(0.5turn, 100%, 50%, 0.1) ✅ ', () =>
  expect(hslMatcher('hsl(0.5turn, 100%, 50%, 0.1)')).toEqual({
    a: '0.1',
    l: '50%',
    h: '0.5turn',
    s: '100%',
  }));

it('=> hsl(-240, -100%, -50%, -0.1) ✅ ', () =>
  expect(hslMatcher('hsl(-240, -100%, -50%, -0.1)')).toEqual({
    a: '-0.1',
    l: '-50%',
    h: '-240',
    s: '-100%',
  }));

it('=> hsl(+240, +100%, +50%, +0.1) ✅ ', () =>
  expect(hslMatcher('hsl(+240, +100%, +50%, +0.1)')).toEqual({
    a: '+0.1',
    l: '+50%',
    h: '+240',
    s: '+100%',
  }));

it('=> hsl(240.5, 99.99%, 49.999%, 0.9999) ✅ ', () =>
  expect(hslMatcher('hsl(240.5, 99.99%, 49.999%, 0.9999)')).toEqual({
    a: '0.9999',
    l: '49.999%',
    h: '240.5',
    s: '99.99%',
  }));

it('=> hsl(.9, .99%, .999%, .9999) ✅ ', () =>
  expect(hslMatcher('hsl(.9, .99%, .999%, .9999)')).toEqual({
    a: '.9999',
    l: '.999%',
    h: '.9',
    s: '.99%',
  }));

it('=> hsl(0240, 0100%, 0050%, 01) ✅ ', () =>
  expect(hslMatcher('hsl(0240, 0100%, 0050%, 01)')).toEqual({
    a: '01',
    l: '0050%',
    h: '0240',
    s: '0100%',
  }));

it('=> hsl(240.0, 100.00%, 50.000%, 1.0000) ✅ ', () =>
  expect(hslMatcher('hsl(240.0, 100.00%, 50.000%, 1.0000)')).toEqual({
    a: '1.0000',
    l: '50.000%',
    h: '240.0',
    s: '100.00%',
  }));

it('=> hsl(2400, 1000%, 1000%, 10) ✅ ', () =>
  expect(hslMatcher('hsl(2400, 1000%, 1000%, 10)')).toEqual({
    a: '10',
    l: '1000%',
    h: '2400',
    s: '1000%',
  }));

it('=> hsl(-2400.01deg, -1000.5%, -1000.05%, -100) ✅ ', () =>
  expect(hslMatcher('hsl(-2400.01deg, -1000.5%, -1000.05%, -100)')).toEqual({
    a: '-100',
    l: '-1000.05%',
    h: '-2400.01deg',
    s: '-1000.5%',
  }));

it('=> hsl(2.40e+2, 1.00e+2%, 5.00e+1%, 1E-3) ✅ ', () =>
  expect(hslMatcher('hsl(2.40e+2, 1.00e+2%, 5.00e+1%, 1E-3)')).toEqual({
    h: '2.40e+2',
    s: '1.00e+2%',
    l: '5.00e+1%',
    a: '1E-3',
  }));

it('=> hsl(2.40e+2, 1.00e+2%, 5.00e+1%, 1E-3%) ✅ ', () =>
  expect(hslMatcher('hsl(2.40e+2, 1.00e+2%, 5.00e+1%, 1E-3%)')).toEqual({
    h: '2.40e+2',
    s: '1.00e+2%',
    l: '5.00e+1%',
    a: '1E-3%',
  }));

// space separated (CSS Color Level 4)
it('=> hsl(240 100% 50%) ✅ ', () =>
  expect(hslMatcher('hsl(240 100% 50%)')).toEqual({
    h: '240',
    s: '100%',
    l: '50%',
    a: undefined,
  }));

it('=> hsl(240 100% 50% / 0.1) ✅ ', () =>
  expect(hslMatcher('hsl(240 100% 50% / 0.1)')).toEqual({
    h: '240',
    s: '100%',
    l: '50%',
    a: '0.1',
  }));

it('=> hsla(240, 100%, 50%) ✅ ', () =>
  expect(hslMatcher('hsla(240, 100%, 50%)')).toEqual({
    h: '240',
    s: '100%',
    l: '50%',
    a: undefined,
  }));

it('=> hsla(240, 100%, 50%, 0.1) ✅ ', () =>
  expect(hslMatcher('hsla(240, 100%, 50%, 0.1)')).toEqual({
    h: '240',
    s: '100%',
    l: '50%',
    a: '0.1',
  }));

it('=> HSL(240Deg, 100%, 50%) ✅ ', () =>
  expect(hslMatcher('HSL(240Deg, 100%, 50%)')).toEqual({
    h: '240Deg',
    s: '100%',
    l: '50%',
    a: undefined,
  }));

it('=> hlsStringToRGB("hsla(240, 100%, 50%)")', () =>
  expect(hlsStringToRGB('hsla(240, 100%, 50%)')).toEqual({
    r: 0,
    g: 0,
    b: 255,
  }));

it('=> hlsStringToRGB("hsl(240, 100%, 50%)")', () =>
  expect(hlsStringToRGB('hsl(240, 100%, 50%)')).toEqual({
    r: 0,
    g: 0,
    b: 255,
  }));

it('=> hlsStringToRGB("hsl(0240, 0100%, 0050%, 01)")', () =>
  expect(hlsStringToRGB('hsl(0240, 0100%, 0050%, 01)')).toEqual({
    r: 0,
    g: 0,
    b: 255,
    a: 1,
  }));

it('=> hlsStringToRGB("hsl(2400, 1000%, 1000%)")', () =>
  expect(hlsStringToRGB('hsl(2400, 1000%, 1000%)')).toEqual({
    r: 255,
    g: 255,
    b: 255,
  }));

it('=> hlsStringToRGB("hsl(2.40e+2, 1.00e+2%, 5.00e+1%, 1E-3)")', () =>
  expect(hlsStringToRGB('hsl(2.40e+2, 1.00e+2%, 5.00e+1%, 1E-3)')).toEqual({
    r: 0,
    g: 0,
    b: 255,
    a: 0.001,
  }));

it('=> hlsStringToRGB("hsl(2.40e+2turn, 1.00e+2%, 5.00e+1%, 1E-3)")', () =>
  expect(hlsStringToRGB('hsl(2.40e+2, 1.00e+2%, 5.00e+1%, 1E-3)')).toEqual({
    r: 0,
    g: 0,
    b: 255,
    a: 0.001,
  }));

it('=> hlsStringToRGB("hsl(2.40e+2 1.00e+2% 5.00e+1% / 1E-3)")', () =>
  expect(hlsStringToRGB('hsl(2.40e+2, 1.00e+2%, 5.00e+1%, 1E-3)')).toEqual({
    r: 0,
    g: 0,
    b: 255,
    a: 0.001,
  }));

it('=> hlsStringToRGB("hsl(2.40e+2deg 1.00e+2% 5.00e+1% / 1E-3)")', () =>
  expect(hlsStringToRGB('hsl(2.40e+2deg 1.00e+2% 5.00e+1% / 1E-3)')).toEqual({
    r: 0,
    g: 0,
    b: 255,
    a: 0.001,
  }));

it('=> hlsStringToRGB("hsl(180deg, 100%, 50%, 0.1)")', () =>
  expect(hlsStringToRGB('hsl(180deg, 100%, 50%, 0.1)')).toEqual({
    r: 0,
    g: 255,
    b: 255,
    a: 0.1,
  }));

it('=> hlsStringToRGB("hsl(180deg 100% 50% / 0.1)")', () =>
  expect(hlsStringToRGB('hsl(180deg, 100%, 50%, 0.1)')).toEqual({
    r: 0,
    g: 255,
    b: 255,
    a: 0.1,
  }));

it('=> hlsStringToRGB("hsl(0.5turn, 100%, 50%, 0.1)")', () =>
  expect(hlsStringToRGB('hsl(0.5turn, 100%, 50%, 0.1)')).toEqual({
    r: 0,
    g: 255,
    b: 255,
    a: 0.1,
  }));

it('=> hlsStringToRGB("hsl(190deg 100% 36% / 53%)")', () =>
  expect(hlsStringToRGB('hsl(190deg 100% 36% / 53%)')).toEqual({
    r: 0,
    g: 153,
    b: 184,
    a: 0.53,
  }));

it('=> hlsStringToRGB("hsl(-240, -100%, -50%, -0.1)")', () =>
  expect(hlsStringToRGB('hsl(-240, -100%, -50%, -0.1)')).toEqual({
    r: 0,
    g: 0,
    b: 0,
    a: -0.1,
  }));

it('=> hlsStringToRGB("hsl(3.14rad, 100%, 50%, 0.1)")', () =>
  expect(hlsStringToRGB('hsl(3.14rad, 100%, 50%, 0.1)')).toEqual({
    r: 0,
    g: 255,
    b: 255,
    a: 0.1,
  }));

it('=> hlsStringToRGB("hsl(200grad, 100%, 50%, 0.1)")', () =>
  expect(hlsStringToRGB('hsl(200grad, 100%, 50%, 0.1)')).toEqual({
    r: 0,
    g: 255,
    b: 255,
    a: 0.1,
  }));

it('=> hlsStringToRGB("hsl(-200grad, 100%, 50%)")', () =>
  expect(hlsStringToRGB('hsl(-200grad, 100%, 50%)')).toEqual({
    r: 0,
    g: 255,
    b: 255,
  }));

it('=> hlsStringToRGB("hsla(240, 100%, 50%, 0.1)")', () =>
  expect(hlsStringToRGB('hsla(240, 100%, 50%, 0.1)')).toEqual({
    r: 0,
    g: 0,
    b: 255,
    a: 0.1,
  }));

it('=> hlsStringToRGB("hsl(240 100% 50% / 0.1)")', () =>
  expect(hlsStringToRGB('hsl(240 100% 50% / 0.1)')).toEqual({
    r: 0,
    g: 0,
    b: 255,
    a: 0.1,
  }));

it('=> hlsStringToRGB("hsl(-2400.01deg, -1000.5%, -1000.05%, -100)")', () =>
  expect(hlsStringToRGB('hsl(-2400.01deg, -1000.5%, -1000.05%, -100)')).toEqual({
    r: 0,
    g: 0,
    b: 0,
    a: -100,
  }));

it('=> hlsStringToRGB("hsl(240.0, 100.00%, 50.000%, 1.0000)")', () =>
  expect(hlsStringToRGB('hsl(240.0, 100.00%, 50.000%, 1.0000)')).toEqual({
    r: 0,
    g: 0,
    b: 255,
    a: 1,
  }));

it('=> hlsStringToRGB("hsl(.9, .99%, .999%, .9999)")', () =>
  expect(hlsStringToRGB('hsl(.9, .99%, .999%, .9999)')).toEqual({
    r: 3,
    g: 3,
    b: 3,
    a: 0.9999,
  }));

it('=> hlsStringToRGB("hsl(.9deg, .99%, .999%, .9999)")', () =>
  expect(hlsStringToRGB('hsl(.9deg, .99%, .999%, .9999)')).toEqual({
    r: 3,
    g: 3,
    b: 3,
    a: 0.9999,
  }));

it('=> hlsStringToRGB("hsl(-.9deg, .99%, .999%, .9999)")', () =>
  expect(hlsStringToRGB('hsl(.9deg, .99%, .999%, .9999)')).toEqual({
    r: 3,
    g: 3,
    b: 3,
    a: 0.9999,
  }));

it('=> hlsStringToRGB("hsl(+.9deg, .99%, .999%, .9999)")', () =>
  expect(hlsStringToRGB('hsl(.9deg, .99%, .999%, .9999)')).toEqual({
    r: 3,
    g: 3,
    b: 3,
    a: 0.9999,
  }));

it('=> hlsStringToRGB("hsl(240.5, 99.99%, 49.999%, 0.9999)")', () =>
  expect(hlsStringToRGB('hsl(240.5, 99.99%, 49.999%, 0.9999)')).toEqual({
    r: 2,
    g: 0,
    b: 255,
    a: 0.9999,
  }));

it('=> hlsStringToRGB("hsl(+240, +100%, +50%, +0.1)")', () =>
  expect(hlsStringToRGB('hsl(+240, +100%, +50%, +0.1)')).toEqual({
    r: 0,
    g: 0,
    b: 255,
    a: 0.1,
  }));

it('=> hlsStringToRGB("")', () => expect(hlsStringToRGB('')).toBeUndefined());
