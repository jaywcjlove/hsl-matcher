HSL(a) Matcher
===

[![Build & Deploy](https://github.com/jaywcjlove/hsl-matcher/actions/workflows/ci.yml/badge.svg)](https://github.com/jaywcjlove/hsl-matcher/actions/workflows/ci.yml)
[![Open in unpkg](https://img.shields.io/badge/Open%20in-unpkg-blue)](https://jaywcjlove.github.io/npm-unpkg/#/pkg/hsl-matcher/file/README.md)
[![npm version](https://img.shields.io/npm/v/hsl-matcher.svg)](https://www.npmjs.com/package/hsl-matcher)
[![Coverage Status](https://jaywcjlove.github.io/hsl-matcher/badges.svg)](https://jaywcjlove.github.io/hsl-matcher/lcov-report/)

A module to find HSL(a) color syntax substrings in a string with their offsets and their color instance.

## Installation

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c): Node 12+ is needed to use it and it must be import instead of require.

```bash
npm install hsl-matcher
```

If you still want to use in CommonJS, you can use dynamic `import()` to load.

```js
const hslMatcher = await import('hsl-matcher');

// Fix compiling in typescript.
// https://github.com/microsoft/TypeScript/issues/43329#issuecomment-922544562
const hslMatcher = await (Function('return import("hsl-matcher")')()) as Promise<typeof import("hsl-matcher")>;
```

## Usage

```js
import hslMatcher from "hsl-matcher";

hslMatcher("hsl(240, 100%, 50%)");                         // ✅ comma separated
// => { h: '240', s: '100%', l: '50%', a: undefined }
hslMatcher("hsl(240, 100%, 50%, 0.1)");                    // ✅ comma separated with opacity
// => { h: '240', s: '100%', l: '50%', a: '0.1' }
hslMatcher("hsl(240, 100%, 50%, 10%)");                    // ✅ comma separated with % opacity
// => { h: '240', s: '100%', l: '50%', a: '10%' }
hslMatcher("hsl(240, 100%, 50%, 10x)");                    // ❌
hslMatcher("hsl(240,100%,50%,0.1)");                       // ✅ comma separated without spaces
hslMatcher("hsl(180deg, 100%, 50%, 0.1)");                 // ✅ hue with 'deg'
hslMatcher("hsl(3.14rad, 100%, 50%, 0.1)");                // ✅ hue with 'rad'
hslMatcher("hsl(200grad, 100%, 50%, 0.1)");                // ✅ hue with 'grad'
hslMatcher("hsl(0.5turn, 100%, 50%, 0.1)");                // ✅ hue with 'turn'
hslMatcher("hsl(-240, -100%, -50%, -0.1)");                // ✅ negative values
hslMatcher("hsl(+240, +100%, +50%, +0.1)");                // ✅ explicit positive sign
hslMatcher("hsl(240.5, 99.99%, 49.999%, 0.9999)");         // ✅ non-integer values
hslMatcher("hsl(.9, .99%, .999%, .9999)");                 // ✅ fraction w/o leading zero
hslMatcher("hsl(.9, .99%, .999%, )");                      // ❌
hslMatcher("hsl(0240, 0100%, 0050%, 01)");                 // ✅ leading zeros
hslMatcher("hsl(240.0, 100.00%, 50.000%, 1.0000)");        // ✅ trailing decimal zeros
hslMatcher("hsl(2400, 1000%, 1000%, 10)");                 // ✅ out of range values
hslMatcher("hsl(-2400.01deg, -1000.5%, -1000.05%, -100)"); // ✅ combination of above
hslMatcher("hsl(2.40e+2, 1.00e+2%, 5.00e+1%, 1E-3)");      // ✅ scientific notation
hslMatcher("hsl(240 100% 50%)");                           // ✅ space separated (CSS Color Level 4)
hslMatcher("hsl(240 100% 50% / 0.1)");                     // ✅ space separated with opacity
hslMatcher("hsla(240, 100%, 50%)");                        // ✅ hsla() alias
hslMatcher("hsla(240, 100%, 50%, 0.1)");                   // ✅ hsla() with opacity
hslMatcher("HSL(240Deg, 100%, 50%)");                      // ✅ case insensitive
```

## Contributors

As always, thanks to our amazing contributors!

<a href="https://github.com/jaywcjlove/hsl-matcher/graphs/contributors">
  <img src="https://jaywcjlove.github.io/hsl-matcher/CONTRIBUTORS.svg" />
</a>

Made with [action-contributors](https://github.com/jaywcjlove/github-action-contributors).

## License

Licensed under the MIT License.
