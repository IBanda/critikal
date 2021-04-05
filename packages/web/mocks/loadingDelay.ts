export default async function loadingDelay() {
  await new Promise((r) => setTimeout(r, 500));
}
