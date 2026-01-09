/* ===== STORAGE ===== */
function getExpenses() {
  return JSON.parse(localStorage.getItem("expenses")) || [];
}

function saveExpenses(expenses) {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

/* ===== UTILS ===== */
function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

/* ===== ADD EXPENSE (DÙNG CHUNG) ===== */
function addExpense(title, amount, date = today()) {
  const expenses = getExpenses();
  expenses.push({
    id: Date.now(),
    title,
    amount,
    date
  });
  saveExpenses(expenses);
}
function highlightMenu() {
  const path = location.pathname.split("/").pop();
  document.querySelectorAll(".top-nav .nav-item").forEach(a => {
    if (a.getAttribute("href") === path) {
      a.classList.add("active");
    }
  });
}
highlightMenu();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}
