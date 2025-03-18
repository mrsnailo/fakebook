export function toggleTheme() {
  const currentTheme = localStorage.getItem("theme") || "light";
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  document.documentElement.classList.toggle("dark", newTheme === "dark");
  localStorage.setItem("theme", newTheme);
  return newTheme; 
}

export function getCurrentTheme() {
  return localStorage.getItem("theme") || "light";
}

export function applyStoredTheme() {
  const storedTheme = getCurrentTheme();
  document.documentElement.classList.toggle("dark", storedTheme === "dark");
}
