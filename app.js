const budgetInput = document.getElementById("budget-input");
const budgetBtn = document.getElementById("budget-btn");

const expenseTitle = document.getElementById("expense-title");
const expenseAmount = document.getElementById("expense-amount");
const expenseBtn = document.getElementById("expense-btn");

const totalBudgetDisplay = document.getElementById("total-budget");
const totalExpenseDisplay = document.getElementById("total-expense");
const balanceDisplay = document.getElementById("balance");
const expenseList = document.getElementById("expense-list");

let totalBudget = 0;
let totalExpense = 0;

budgetBtn.addEventListener("click", () => {
  const budgetValue = Number(budgetInput.value);

  if (budgetValue <= 0 || isNaN(budgetValue)) {
    alert("Please enter a valid budget amount!");
    return;
  }

  totalBudget = budgetValue;

  totalBudgetDisplay.innerText = totalBudget;
  balanceDisplay.innerText = totalBudget - totalExpense;

  budgetInput.value = "";
});

expenseBtn.addEventListener("click", () => {
  const title = expenseTitle.value.trim();
  const amount = Number(expenseAmount.value);

  if (title === "" || amount <= 0 || isNaN(amount)) {
    alert("Please enter valid expense details!");
    return;
  }

  totalExpense += amount;
  totalExpenseDisplay.innerText = totalExpense;
  balanceDisplay.innerText = totalBudget - totalExpense;

  const li = document.createElement("li");
  li.classList.add("expense-item");

  li.innerHTML = `
        <div class="expense-name">
            <span class="bar"></span>
            <p>${title}</p>
        </div>
        <p class="expense-amount">${amount}</p>
        <div class="actions">
            <button type="button" class="edit-btn" aria-label="Edit expense">
                <i class="fa-regular fa-pen-to-square"></i>
            </button>
            <button type="button" class="delete-btn" aria-label="Delete expense">
                <i class="fa-regular fa-trash-can"></i>
            </button>
        </div>
    `;

  expenseList.appendChild(li);

  expenseTitle.value = "";
  expenseAmount.value = "";
});

expenseList.addEventListener("click", (e) => {
  const target = e.target;

  if (
    target.classList.contains("delete-btn") ||
    target.parentElement.classList.contains("delete-btn")
  ) {
    const item = target.closest(".expense-item");

    const amount = Number(item.querySelector(".expense-amount").innerText);

    totalExpense -= amount;
    totalExpenseDisplay.innerText = totalExpense;
    balanceDisplay.innerText = totalBudget - totalExpense;

    item.remove();
  }

  if (
    target.classList.contains("edit-btn") ||
    target.parentElement.classList.contains("edit-btn")
  ) {
    const item = target.closest(".expense-item");

    const oldTitle = item.querySelector(".expense-name p").innerText;
    const oldAmount = Number(item.querySelector(".expense-amount").innerText);

    expenseTitle.value = oldTitle;
    expenseAmount.value = oldAmount;

    totalExpense -= oldAmount;
    totalExpenseDisplay.innerText = totalExpense;
    balanceDisplay.innerText = totalBudget - totalExpense;

    item.remove();
  }
});
