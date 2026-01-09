const id = Number(getParam("id"));
let expenses = getExpenses();
let expense = expenses.find(e => e.id === id);

if (!expense) {
  alert("Không tìm thấy khoản chi");
  history.back();
}

// Load dữ liệu cũ
document.querySelector('input[type="text"]').value = expense.title;
document.querySelector('input[type="number"]').value = expense.amount;
document.querySelector('input[type="date"]').value = expense.date;

// LƯU
document.querySelector(".form").addEventListener("submit", e => {
  e.preventDefault();

  expense.title = document.querySelector('input[type="text"]').value.trim();
  expense.amount = Number(document.querySelector('input[type="number"]').value);
  expense.date = document.querySelector('input[type="date"]').value;

  saveExpenses(expenses);
  location.href = `day.html?date=${expense.date}`;
});

// XOÁ
document.querySelector(".delete").addEventListener("click", () => {
  if (!confirm("Xoá khoản chi này?")) return;

  expenses = expenses.filter(e => e.id !== id);
  saveExpenses(expenses);
  location.href = `day.html?date=${expense.date}`;
});
