export async function doWork() {
  const { doWork } = await import('./second.js');
  await doWork();
}
