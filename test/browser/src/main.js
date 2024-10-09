import('./first.js').then(async ({ doWork }) => {
  await doWork();
});
