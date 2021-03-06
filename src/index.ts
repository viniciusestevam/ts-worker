import { Worker, WorkerOptions } from 'worker_threads';
import * as callsite from 'callsite';
const stack = callsite();

export default function TSWorker(
  workerFile: string,
  options?: WorkerOptions
): Worker {
  const workerFilePath: string = getWorkerFilePath(workerFile);
  options.workerData = { ...options.workerData, workerFilePath };
  return new Worker(__dirname + '/register.js', {
    ...options
  });
}

function getWorkerFilePath(workerFilename: string): string {
  const callerFilePath = stack[stack.length - 2].getFileName();
  const res = callerFilePath.slice(0, callerFilePath.lastIndexOf('/'));
  return workerFilename.startsWith('/')
    ? res.concat(workerFilename)
    : res.concat('/' + workerFilename);
}
