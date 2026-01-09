document.getElementById("date").value = today();

document.getElementById("add-form").addEventListener("submit", e => {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const amount = Number(document.getElementById("amount").value);
  const date = document.getElementById("date").value;

  if (!title || amount <= 0) {
    alert("Dữ liệu không hợp lệ");
    return;
  }

  addExpense(title, amount, date);
  location.href = "index.html";
});
