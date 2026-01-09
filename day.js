const date = getParam("date") || new Date().toISOString().slice(0, 10);
const list = document.querySelector(".expense-list");
const totalText = document.querySelector(".summary h1");
document.querySelector(".header h2").innerText = date.split("-").reverse().join("/");

const expenses = getExpenses().filter(e => e.date === date);

function render() {
  list.innerHTML = "";
  let total = 0;

  expenses.forEach(e => {
    total += e.amount;

    const li = document.createElement("li");
    li.className = "expense-item";
    li.innerHTML = `
      <div>
        <strong>${e.title}</strong>
        <span>${e.amount.toLocaleString()} đ</span>
      </div>
      <a href="edit.html?id=${e.id}" class="edit">✏️</a>
    `;
    list.appendChild(li);
  });

  totalText.innerText = total.toLocaleString() + " đ";
}

render();
