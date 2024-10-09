export async function doWork() {
  const { doWork } = await import('./third.js');
  await doWork();
}
