const expenses = getExpenses();

/* ===== DATE UTILS ===== */
function startOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay() || 7; // CN = 7
  d.setDate(d.getDate() - day + 1); // Thứ 2
  return d;
}

function format(d) {
  return d.toISOString().slice(0, 10);
}

function display(d) {
  return d.split("-").reverse().join("/");
}

/* ===== INIT ===== */
let baseDate = getParam("date") || today();
let weekStart = startOfWeek(baseDate);

/* ===== RENDER ===== */
function render() {
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);

  document.getElementById("week-title").innerText =
    `Tuần ${display(format(weekStart))} – ${display(format(weekEnd))}`;

  let total = 0;
  const list = document.getElementById("day-list");
  list.innerHTML = "";

  for (let i = 0; i < 7; i++) {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i);
    const dateStr = format(d);

    const dayExpenses = expenses.filter(e => e.date === dateStr);
    const dayTotal = dayExpenses.reduce((s, e) => s + e.amount, 0);
    total += dayTotal;

    const li = document.createElement("li");
    li.className = "expense-item";
    li.innerHTML = `
      <div>
        <strong>${display(dateStr)}</strong>
        <span>${dayTotal.toLocaleString()} đ</span>
      </div>
      <a href="day.html?date=${dateStr}">></a>
    `;
    list.appendChild(li);
  }

  document.getElementById("week-total").innerText =
    total.toLocaleString() + " đ";
}

/* ===== NAV ===== */
document.getElementById("prev-week").onclick = () => {
  weekStart.setDate(weekStart.getDate() - 7);
  render();
};

document.getElementById("next-week").onclick = () => {
  weekStart.setDate(weekStart.getDate() + 7);
  render();
};

render();
