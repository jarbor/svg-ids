# svg-ids
Deduplicate IDs found across multiple SVGs in the DOM and make browsers happy.

Browsers require IDs to be unique across the entire document, not just a single SVG instance. This can lead to unexpected behavior when including an SVG multiple times in a single document (icons for instance). As an example, when you update SVG path data with JavaScript, Chome 60 will update the same path in all SVGs in the document, even if you only targeted a specific path element. This isn't really a Chrome bug because it is relying on IDs being unique as per the W3C spec.

This package fixes every duplicate ID and their `url()` references in SVGs across the entire document with a single function call.

## Installation
```
yarn add svg-ids
```

### ES6
```js
import SvgIds from 'svg-ids';
```

### CommonJS
```js
var SvgIds = require('svg-ids');
```

### Global Script Include
```html
<script src="svg-ids.js">
```

## Usage
Run this single function to fix SVG IDs across the entire DOM.
```js
new SvgIds().makeUnique();
```

If you prefer to restrict the scope of what `SvgIds` searches and fixes to a smaller portion of the DOM, simply pass a scoping element into the constructor>
```js
new SvgIds(element).makeUnique();
```
