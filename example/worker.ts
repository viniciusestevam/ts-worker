import { parentPort, workerData } from 'worker_threads';

function teste(n) {
  if (n === 1 || n === 0) {
    return 1;
  }
  return teste(n - 1) * n;
}

parentPort.postMessage(teste(workerData.value));
