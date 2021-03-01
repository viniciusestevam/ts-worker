const path = require('path');
const { workerData } = require('worker_threads');

require('ts-node').register(workerData.registerOptions);
require(path.resolve(workerData.workerFilePath));
