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
function exportExcel() {
  const expenses = getExpenses();

  // group theo ngày
  const byDate = {};
  expenses.forEach(e => {
    if (!byDate[e.date]) byDate[e.date] = [];
    byDate[e.date].push(e);
  });

  const rows = [];
  rows.push(["ngày-tháng", "đồ", "tiền"]);

  Object.keys(byDate).sort().forEach(date => {
    const items = byDate[date];
    const label = formatDateVN(date); // 1-thg12

    items.forEach((e, i) => {
      rows.push([
        i === 0 ? label : "",
        e.note || e.category || "chi tiêu",
        e.amount
      ]);
    });
  });

  const ws = XLSX.utils.aoa_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Chi tiêu");

  XLSX.writeFile(wb, "chi-tieu.xlsx");
}
function formatDateVN(dateStr) {
  const d = new Date(dateStr);
  const day = d.getDate();
  const month = d.getMonth() + 1;
  return `${day}-thg${month}`;
}
