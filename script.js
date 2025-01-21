const transactionName = document.getElementById('transaction-name');
const transactionAmount = document.getElementById('transaction-amount');
const transactionType = document.getElementById('transaction-type');
const addTransactionButton = document.getElementById('add-transaction');
const transactionList = document.getElementById('transaction-list');
const balance = document.getElementById('balance');
const income = document.getElementById('income');
const expense = document.getElementById('expense');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function updateUI() {
  transactionList.innerHTML = '';
  let totalIncome = 0, totalExpense = 0;

  transactions.forEach((transaction, index) => {
    const li = document.createElement('li');
    li.classList.add(transaction.type);
    li.innerHTML = `
      <span>${transaction.name}</span>
      <span>$${transaction.amount.toFixed(2)}</span>
      <button class="delete-btn" onclick="deleteTransaction(${index})">×</button>
    `;
    transactionList.appendChild(li);

    if (transaction.type === 'income') totalIncome += transaction.amount;
    else totalExpense += transaction.amount;
  });

  income.textContent = `$${totalIncome.toFixed(2)}`;
  expense.textContent = `$${totalExpense.toFixed(2)}`;
  balance.textContent = `$${(totalIncome - totalExpense).toFixed(2)}`;
}

function addTransaction() {
  const name = transactionName.value.trim();
  const amount = parseFloat(transactionAmount.value);
  const type = transactionType.value;

  if (name && amount > 0) {
    transactions.unshift({ name, amount, type });
    localStorage.setItem('transactions', JSON.stringify(transactions));
    updateUI();
    transactionName.value = '';
    transactionAmount.value = '';
  }
}

function deleteTransaction(index) {
  transactions.splice(index, 1);
  localStorage.setItem('transactions', JSON.stringify(transactions));
  updateUI();
}

addTransactionButton.addEventListener('click', addTransaction);
window.addEventListener('DOMContentLoaded', updateUI);
