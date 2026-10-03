// --- Phase 1: Core Data Structures ---

// 1. Array of Objects: Represents stored expenses
const expenses = [
  { id: 1, title: "Coffee", amount: 4.5, category: "Food" },
  { id: 2, title: "Internet Bill", amount: 60.0, category: "Utilities" },
  { id: 3, title: "Lunch", amount: 15.0, category: "Food" },
];

// 2. Function: Calculate total spending using array iteration
function calculateTotal(records) {
  let total = 0;
  for (const item of records) {
    total += item.amount;
  }
  return total;
}

// 3. Output results to the console
console.log("=== Expense Tracker Loaded ===");
console.log("Total Records:", expenses.length);
console.log("Total Spent: $" + calculateTotal(expenses).toFixed(2));

// 4. Function: Add a new expense
function addExpense(title, amount, category) {
  const newExpense = {
    id: expenses.length + 1,
    title: title,
    amount: amount,
    category: category,
  };
  expenses.push(newExpense);
  console.log(`Added: ${title} ($${amount})`);
}

// 5. Function: Filter expenses by category using .filter()
function getExpensesByCategory(category) {
  return expenses.filter(item => item.category.toLowerCase() === category.toLowerCase());
}

// --- Test the new features ---
console.log("\n--- Adding New Item ---");
addExpense("Groceries", 45.25, "Food");

console.log("\n--- Food Expenses Only ---");
const foodExpenses = getExpensesByCategory("Food");
console.log(foodExpenses);

console.log("\nNew Total Spent: $" + calculateTotal(expenses).toFixed(2));