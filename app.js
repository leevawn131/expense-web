function getExpenses() {
  return JSON.parse(localStorage.getItem("expenses")) || [];
}

function saveExpenses(expenses) {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}
