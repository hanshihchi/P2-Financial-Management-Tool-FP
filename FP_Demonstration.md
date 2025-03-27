# Functional Programming and Design Patterns in the Financial Management Tool

This document demonstrates how the project applies various Functional Programming (FP) principles and design patterns. For each FP principle, we provide an example from the code, explain why it is a good application of FP, and then provide a hypothetical example that would break the concept. We also highlight examples of array functional programming methods and show how design patterns are applied in the project.

---

## Functional Programming Principles

### 1. Pure Functions

**Example from Code:**

In `Transaction.js`, the `categorizeTransactions` function is pure. It takes an array of transactions as input and returns a new object mapping each category to its total amount. It does not modify any external state.

```javascript
// Transaction.js
function categorizeTransactions(transactions) {
  return transactions.reduce((acc, tx) => {
    return { ...acc, [tx.category]: (acc[tx.category] || 0) + tx.amount };
  }, {});
}
```

- **No Side Effects:** The function doesn’t alter any external variables.
- **Predictability:** Given the same input, it always produces the same output.
- **Testability:** It can be easily tested in isolation.

**Hypothetical Example that Breaks Purity:**

A function that modifies a global variable instead of returning a new value:

```javascript
// Impure example
let globalSum = 0;
function impureCategorizeTransactions(transactions) {
  transactions.forEach(tx => {
    globalSum += tx.amount; // Modifies external state
  });
  return globalSum;
}
```

---

### 2. Immutability

**Example from Code:**

When a new income is added in `AddIncome.jsx`, the state is updated immutably using the spread operator. This creates a new array rather than modifying the old one.

```jsx
// In IncomePage.jsx when adding a new income:
setIncomes(prev => [...prev, newIncome]);
```

- **Prevents Side Effects:** The original state is never altered.
- **Easier Debugging:** Each state change produces a new value, making it easier to track changes over time.
- **Predictability:** Immutability leads to more predictable code behavior.

**Hypothetical Example that Breaks Immutability:**

Directly mutating the state array, which can lead to bugs:

```javascript
// Mutating the state directly
incomes.push(newIncome);
setIncomes(incomes); // This directly changes the original array
```

---

### 3. First-Class Functions

**Example from Code:**

Functions are passed as props (e.g., `onNewIncome`, `onRemoveExpense`), treating functions as first-class citizens. For instance, in `AddIncome.jsx`:

```jsx
// AddIncome.jsx:
if (onNewIncome) {
  onNewIncome(newIncome); // Passing a function as an argument
}
```

- **Flexibility:** Functions can be passed, returned, and assigned to variables.
- **Composition:** It allows building complex functionality by composing simpler functions.

**Hypothetical Example that Breaks First-Class Functions:**

A language where functions cannot be passed as arguments, forcing the use of global state or other workarounds (this is a hypothetical scenario since JavaScript supports first-class functions by default).

```javascript
// Hypothetical scenario (other programming language):
// function doSomething() {
//    // Cannot pass a function as an argument
// }
```

---

### 4. Higher-Order Functions

**Example from Code:**

Array methods like `map`, `filter`, and `reduce` are higher-order functions because they take functions as parameters. In the `categorizeTransactions` example, `reduce` is used:

```javascript
// Transaction.js using reduce (a higher-order function)
return transactions.reduce((acc, tx) => {
  return { ...acc, [tx.category]: (acc[tx.category] || 0) + tx.amount };
}, {});
```

- **Abstraction:** Higher-order functions abstract common patterns like mapping or filtering.
- **Conciseness:** They reduce boilerplate and express the developer’s intent clearly.

**Hypothetical Example that Breaks Higher-Order Functions:**

Using manual loops instead of expressive higher-order functions, leading to verbose code:

```javascript
// Imperative approach that is more error-prone:
let acc = {};
for (let i = 0; i < transactions.length; i++) {
  const tx = transactions[i];
  if (acc[tx.category]) {
    acc[tx.category] += tx.amount;
  } else {
    acc[tx.category] = tx.amount;
  }
}
return acc;
```

---

### 5. Declarative over Imperative

**Example from Code:**

In `IncomeLog.jsx`, filtering and sorting are done declaratively using `filter` and `sort`, which describe *what* to do rather than *how* to do it:

```javascript
// IncomeLog.jsx: Declarative filtering and sorting
const sortedIncomes = [...filteredIncomes].sort((a, b) => {
  if (sortOption === "date") {
    return new Date(a.date) - new Date(b.date);
  } else if (sortOption === "added") {
    return a.createdAt - b.createdAt;
  }
  return 0;
});
```

- **Readability:** Declarative code is concise and easier to understand.
- **Maintainability:** It reduces complexity by abstracting the control flow.

**Hypothetical Example that Breaks Declarativeness:**

Using a manual loop with complex control flow instead of high-level array methods:

```javascript
// Imperative approach
let sorted = [];
for (let i = 0; i < filteredIncomes.length; i++) {
  for (let j = i + 1; j < filteredIncomes.length; j++) {
    // Complex logic to compare and sort items...
  }
  sorted.push(filteredIncomes[i]);
}
```

---

## Examples of Array Functional Programming Methods

### 1. Using `filter`

In **IncomeLog.jsx**, filtering incomes based on criteria is done with the `filter` method:

```javascript
const filteredIncomes = incomes.filter(income => {
  return (!filterCriteria.date || income.date === filterCriteria.date) &&
         (!filterCriteria.category || income.category.toLowerCase() === filterCriteria.category.toLowerCase()) &&
         (!filterCriteria.minAmount || income.amount >= parseFloat(filterCriteria.minAmount)) &&
         (!filterCriteria.maxAmount || income.amount <= parseFloat(filterCriteria.maxAmount));
});
```

### 2. Using `reduce`

In **Transaction.js**, the `reduce` method is used to aggregate transaction amounts by category:

```javascript
function categorizeTransactions(transactions) {
  return transactions.reduce((acc, tx) => {
    return { ...acc, [tx.category]: (acc[tx.category] || 0) + tx.amount };
  }, {});
}
```

### 3. Using `map`

In **IncomeLog.jsx**, `map` is used to render the list of income entries:

```jsx
<ul>
  {sortedIncomes.map(income => (
    <li key={income.id}>
      {income.date} - {income.amount} ({income.category}) - {income.description}
    </li>
  ))}
</ul>
```

---

## Examples of Design Patterns

## 1. Module Pattern

### Application

The modules, such as `TransactionModule.js`, encapsulate related functionality and export only the necessary functions. This keeps the global namespace clean and prevents unintended interactions.

```javascript
// Transaction.js (Module Pattern)
export default function createTransactionModule() {
  function addTransaction(transactions, transaction) {
    return [...transactions, transaction];
  }
  function filterByDate(transactions, date) {
    return transactions.filter(tx => new Date(tx.date).toDateString() === new Date(date).toDateString());
  }
  function categorizeTransactions(transactions) {
    return transactions.reduce((acc, tx) => {
      return { ...acc, [tx.category]: (acc[tx.category] || 0) + tx.amount };
    }, {});
  }
  return { addTransaction, filterByDate, categorizeTransactions };
}
```

### Hypothetical Example that Breaks the Module Pattern

A poor design would expose functions and variables directly into the global scope without encapsulation. This can lead to naming collisions and unpredictable behavior.

```javascript
// No module encapsulation, polluting the global scope
var globalAddTransaction = function(transactions, transaction) {
  transactions.push(transaction);
  return transactions;
};

var globalFilterByDate = function(transactions, date) {
  // Directly modifying global data or relying on external state
  for (var i = 0; i < transactions.length; i++) {
    if (new Date(transactions[i].date).toDateString() !== new Date(date).toDateString()) {
      // Side effects: Removing items from the global array
      transactions.splice(i, 1);
      i--;
    }
  }
  return transactions;
};

// These functions are not encapsulated, may conflict with other parts of the app.
```

---

## 2. Factory Pattern

### Application

We use factory functions to create module instances. For example, `createTransaction()` returns an object with functions for transaction management. This abstracts the creation process and allows for flexible instantiation.

```javascript
// Factory Pattern Example
const transactionModule = createTransaction();
const newState = transactionModule.addTransaction([], { id: 1, amount: 50 });
```

### Hypothetical Example that Breaks the Factory Pattern

A bad approach would be to instantiate objects directly without any abstraction, which may result in repetitive code and less flexibility. For example, if we manually create transaction objects and duplicate logic everywhere:

```javascript
// Direct instantiation without a factory
function Transaction(amount, category) {
  this.amount = amount;
  this.category = category;
  this.createdAt = Date.now();
}

// Using the constructor directly everywhere in the code
const t1 = new Transaction(50, 'Food');
const t2 = new Transaction(20, 'Transport');
// Repeated logic and no abstraction over creation process
```

This approach lacks a centralized creation mechanism, making future changes and maintenance harder.

---

## 3. Singleton Pattern

### Application

The Firebase initialization in `myFirestoreDB.js` is implemented as a Singleton. This ensures that there is only one instance of the Firebase app and Firestore throughout the application.

```javascript
// myFirestoreDB.js (Singleton Pattern)
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // Firebase configuration
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
```

### Hypothetical Example that Breaks the Singleton Pattern

A poor design would initialize Firebase multiple times, leading to multiple instances of the app. This can cause inconsistent data and performance issues.

```javascript
// Multiple Firebase initializations
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Instead of having one central initialization, each file re-initializes Firebase:
export function createNewDBInstance() {
  const app = initializeApp({
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    // ... other config options
  });
  return getFirestore(app);
}

// In different modules, calling createNewDBInstance() creates separate instances.
const dbInstance1 = createNewDBInstance();
const dbInstance2 = createNewDBInstance();
// Now, dbInstance1 and dbInstance2 are not the same, which may cause unpredictable behavior.
```

This breaks the Singleton pattern by allowing multiple instances, which can lead to duplicated network requests, inconsistent state, and hard-to-debug errors.



