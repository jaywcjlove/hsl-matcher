import hslMatcher from '..';

it('=> hsl(240, 100%, 50%, 23x) ❌ ', () => expect(hslMatcher('hsl(240, 100%, 50%, 23x)')).toBeFalsy());

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

it('=> hsl(.9, .99%, .999%, ) ❌ ', () => expect(hslMatcher('hsl(.9, .99%, .999%, )')).toBeFalsy());

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
