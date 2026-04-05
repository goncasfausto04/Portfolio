const bootEl = document.getElementById("boot-text");
const hintEl = document.getElementById("boot-hint");
const mainEl = document.getElementById("main");
const bootWrap = document.getElementById("boot");
const navEl = document.querySelector("nav");
const sections = document.querySelectorAll("section[data-section]");
const bootLines = Array.from(
  document.querySelectorAll("#boot-lines li"),
  (line) => line.textContent,
);

const prompts = Array.from(
  document.querySelectorAll("section[data-section]"),
  (section) => ({
    section,
    prompt: section.querySelector('[data-role="prompt"]'),
  }),
);

function bootDone() {
  bootWrap.classList.add("is-hidden");
  hintEl.classList.add("is-hidden");
  mainEl.classList.remove("is-hidden");
}

function nextLine(index = 0) {
  if (index >= bootLines.length) {
    window.setTimeout(bootDone, 350);
    return;
  }

  bootEl.textContent += `${index === 0 ? "" : "\n"}${bootLines[index]}`;
  const previous = bootLines[index];
  const delay = previous === "" ? 60 : previous.startsWith("  [") ? 75 : 110;
  window.setTimeout(() => nextLine(index + 1), delay);
}

function setActiveSection(id) {
  sections.forEach((section) =>
    section.classList.toggle("active", section.dataset.section === id),
  );
  navEl.querySelectorAll("a[data-target]").forEach((link) => {
    link.classList.toggle("active", link.dataset.target === id);
  });
}

function renderPrompts() {
  prompts.forEach(({ section, prompt }) => {
    if (!prompt) {
      return;
    }

    prompt.innerHTML = `<span class="user">gfaustino</span>@<span class="host">portfolio</span>:<span class="path">~/${section.dataset.section}</span>$`;
  });
}

navEl.addEventListener("click", (event) => {
  const link = event.target.closest("a[data-target]");
  if (!link) {
    return;
  }

  event.preventDefault();
  setActiveSection(link.dataset.target);
});

bootWrap.addEventListener("click", bootDone);

renderPrompts();
setActiveSection("about");
nextLine();
