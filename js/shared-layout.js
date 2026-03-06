async function loadPartial(target) {
  const source = target.dataset.include;

  if (!source) {
    return;
  }

  const response = await fetch(source);

  if (!response.ok) {
    throw new Error(`No se pudo cargar el parcial: ${source}`);
  }

  target.innerHTML = await response.text();
}

document.addEventListener("DOMContentLoaded", async () => {
  const targets = document.querySelectorAll("[data-include]");

  const results = await Promise.allSettled(Array.from(targets, loadPartial));

  results.forEach((result) => {
    if (result.status === "rejected") {
      console.error(result.reason);
    }
  });
});
