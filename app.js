const form = document.getElementById("expense-form");
const list = document.getElementById("list");
const totalText = document.getElementById("total");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function render() {
  list.innerHTML = "";
  let total = 0;

  expenses.forEach((e, i) => {
    total += e.amount;
    const li = document.createElement("li");
    li.innerHTML = `
      ${e.title} - ${e.amount} đ
      <button onclick="remove(${i})">X</button>
    `;
    list.appendChild(li);
  });

  totalText.innerText = `Tổng: ${total} đ`;
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function remove(index) {
  expenses.splice(index, 1);
  render();
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const amount = Number(document.getElementById("amount").value);

  expenses.push({ title, amount });
  form.reset();
  render();
});

render();
