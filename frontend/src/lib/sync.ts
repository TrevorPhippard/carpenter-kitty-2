const syncQueue: Array<() => Promise<void>> = []
let syncRunning = false

export function enqueueSyncTask(task: () => Promise<void>) {
  syncQueue.push(task)
  runSync()
}

async function runSync() {
  if (syncRunning) return
  syncRunning = true
  while (syncQueue.length) {
    const task = syncQueue.shift()!
    try {
      await task()
    } catch (err) {
      console.error('Sync task failed, requeueing', err)
      // re-queue and break to avoid busy loop
      syncQueue.push(task)
      break
    }
  }
  syncRunning = false
}

// Example use: when a comment fails, push a task to re-POST it
