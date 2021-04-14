## Install

```
npm install veifa
```

## Getting started

In JavaScript:

```javascript
// ESM/TypeScript import
import { Veifa, LineRenderer } from 'veifa';

const cavnas = document.getElementById('canvas');
const veifa = new Veifa(cavnas);

const src = 'https://publicshitbucket.s3.eu-central-1.amazonaws.com/115.mp3';
await veifa.loadSrc(src);

veifa.renderer = new LineRenderer();
veifa.render();
```

## Demo

[DEMO](http://www.yannic.tf/)
