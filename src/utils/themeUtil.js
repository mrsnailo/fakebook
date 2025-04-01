export function toggleTheme() {
  const currentTheme = localStorage.getItem("theme") || "light";
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  document.documentElement.classList.remove("dark", "light");
  document.documentElement.classList.add(newTheme);

  localStorage.setItem("theme", newTheme);
  return newTheme;
}

export function getCurrentTheme() {
  return localStorage.getItem("theme") || "light";
}

export function applyStoredTheme() {
  const storedTheme = getCurrentTheme();
  document.documentElement.classList.remove("dark", "light");
  document.documentElement.classList.add(storedTheme);
}
