# :construction_worker: ts-worker

A simple shorthand to use Node <a href="https://nodejs.org/api/worker_threads.html">worker_threads</a>.

**For now there is only support for <a href="https://github.com/TypeStrong/ts-node">ts-node.</a>**

# Why?

Typescript still doesn't offer worker_threads support. To use them, you need to call a .js file to register on ts-node and then from this file call the .ts worker. To decrease verbosity you can use this package.

# Usage

```bash
  npm install ts-worker
```

- Import:

```javascript
const TSWorker = require('ts-worker');
```

- ES6:

```javascript
import TSWorker from 'ts-worker';
```

## Instantiating a Worker

```javascript
import { Worker } from 'worker_threads'; // Just for typechecking
import TSWorker from 'ts-worker';

const worker: Worker = TSWorker('worker.ts', {
  workerData: {
    foo: 'bar'
  }
});

worker.on('message', msg => console.log(msg));
```
