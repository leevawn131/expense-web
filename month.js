const expenses = getExpenses();

/* ===== DATE UTILS ===== */
function format(d) {
  return d.toISOString().slice(0, 10);
}

function display(d) {
  return d.split("-").reverse().join("/");
}

function startOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay() || 7;
  d.setDate(d.getDate() - day + 1);
  return d;
}

/* ===== INIT ===== */
let baseDate = getParam("date") || today();
let current = new Date(baseDate);

/* ===== RENDER ===== */
function render() {
  const year = current.getFullYear();
  const month = current.getMonth();

  document.getElementById("month-title").innerText =
    `Tháng ${month + 1}/${year}`;

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  let total = 0;
  const list = document.getElementById("week-list");
  list.innerHTML = "";

  let weekStart = startOfWeek(firstDay);

  while (weekStart <= lastDay) {
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    let weekTotal = 0;

    expenses.forEach(e => {
      const d = new Date(e.date);
      if (d >= weekStart && d <= weekEnd) {
        weekTotal += e.amount;
      }
    });

    total += weekTotal;

    const li = document.createElement("li");
    li.className = "expense-item";
    li.innerHTML = `
      <div>
        <strong>${display(format(weekStart))} – ${display(format(weekEnd))}</strong>
        <span>${weekTotal.toLocaleString()} đ</span>
      </div>
      <a href="week.html?date=${format(weekStart)}">></a>
    `;
    list.appendChild(li);

    weekStart.setDate(weekStart.getDate() + 7);
  }

  document.getElementById("month-total").innerText =
    total.toLocaleString() + " đ";
}

/* ===== NAV ===== */
document.getElementById("prev-month").onclick = () => {
  current.setMonth(current.getMonth() - 1);
  render();
};

document.getElementById("next-month").onclick = () => {
  current.setMonth(current.getMonth() + 1);
  render();
};

render();
