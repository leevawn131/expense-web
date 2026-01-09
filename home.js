const expenses = getExpenses();
const todayDate = today();

/* ===== NGÀY ===== */
const dayTotal = expenses
  .filter(e => e.date === todayDate)
  .reduce((s, e) => s + e.amount, 0);

document.getElementById("day-total").innerText =
  dayTotal.toLocaleString() + " đ";

/* ===== TUẦN ===== */
function isSameWeek(d1, d2) {
  const a = new Date(d1);
  const b = new Date(d2);
  const diff = Math.abs(a - b);
  return diff / (1000 * 60 * 60 * 24) < 7 && a.getDay() <= b.getDay();
}

const weekTotal = expenses
  .filter(e => isSameWeek(e.date, todayDate))
  .reduce((s, e) => s + e.amount, 0);

document.getElementById("week-total").innerText =
  weekTotal.toLocaleString() + " đ";

/* ===== THÁNG ===== */
const month = todayDate.slice(0, 7);

const monthTotal = expenses
  .filter(e => e.date.startsWith(month))
  .reduce((s, e) => s + e.amount, 0);

document.getElementById("month-total").innerText =
  monthTotal.toLocaleString() + " đ";

/* ===== NAV ===== */
function goDay() {
  location.href = `day.html?date=${todayDate}`;
}
function goWeek() {
  location.href = "week.html";
}
function goMonth() {
  location.href = "month.html";
}
