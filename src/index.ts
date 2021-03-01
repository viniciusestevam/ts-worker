import path from 'path'
import callsite from 'callsite';
import { Worker, WorkerOptions } from 'worker_threads';
const stack = callsite();

export default function TSWorker(
  workerFile: string | Array<string>,
  options?: WorkerOptions,
  registerOptions?: { [key: string]: string }
): Worker {
  const workerFilePath: string = getWorkerFilePath(workerFile);
  options.workerData = { ...options.workerData, registerOptions, workerFilePath };
  return new Worker(__dirname + '/register.js', {
    ...options
  });
}

function getWorkerFilePath(workerFilename: string | Array<string>): string {
  if (Array.isArray(workerFilename)) {
    return path.join(...workerFilename)
  }
  const callerFilePath = stack[stack.length - 2].getFileName();
  const res = callerFilePath.slice(0, callerFilePath.lastIndexOf('/'));
  return workerFilename.startsWith('/')
    ? res.concat(workerFilename)
    : res.concat('/' + workerFilename);
}
