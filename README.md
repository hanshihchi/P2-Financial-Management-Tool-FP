```markdown
# Financial Management Tool

A multi-page financial management application built with React, React-Bootstrap, and Firebase Firestore. This tool allows users to manage personal finances by tracking incomes and expenses, share group expenses, and set financial goals with state tracking and insightful analytics. The project follows a functional programming approach with modularized components and persistent storage using Firestore.

## Features

- **Personal Finance Management**
  - **Income Management:**
    - Add income with date, amount, category, and description.
    - View a daily income log with sorting (by added order or date) and filtering (by date, category, and amount range).
    - See a categorical breakdown and trend analysis.
  - **Expense Management:**
    - Add expenses with date, amount, category, description, and payer.
    - View a daily expense log with similar sorting and filtering functionalities.
    - Display a categorical breakdown and trend analysis.

- **Group Expense Sharing**
  - Create, select, and manage multiple groups.
  - Add group expenses and members.
  - Remove group expenses and update Firestore accordingly.
  - Calculate equal splitting of group expenses based on the latest total amount.

- **Financial Goal Setting & Tracking**
  - Create multiple financial goals with target amounts, deadlines, and descriptions.
  - View a list of your goals, including calculated average amount per day needed to reach each goal.
  - Remove goals when no longer needed.
  
- **Persistent Storage**
  - All transactions, groups, and goals are stored in Firebase Firestore.
  - Data persists across page reloads and sessions.

## Installation

1. **Clone the Repository**

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure Firebase:**
   - Update `src/myFirestoreDB.js` with your Firebase project's configuration.
   - Ensure your Firestore database has the required collections: `transactions`, `groups`, and `goals`.

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```

## Usage

- **Home Page:**  
  Displays the current balance and four sections (Income Management, Expense Management, Group Expense Sharing, Financial Goal Setting & Tracking). Click on a section to navigate to the corresponding page.

- **Income Page:**  
  Manage your incomes using the "Manage" tab (Add Income and Daily Income Log) and analyze them using the "Analyze" tab (Categorical Breakdown and Trend Analysis).

- **Expense Page:**  
  Similar to the Income Page, but for expenses.

- **Group Page:**  
  Create and manage multiple groups. On the left side, create a new group, select and manage group members and add group expenses. On the right side, view group expenses with sorting/filtering and see the calculated expense splitting.

- **Goal Page:**  
  Create new financial goals and view your current goals along with calculated metrics such as average amount per day needed to achieve each goal.

## Project Structure

```
financial_management/
├── src/
│   ├── components/
│   │   ├── AddIncome.jsx
│   │   ├── IncomeLog.jsx
│   │   ├── IncomeCategorical.jsx
│   │   ├── IncomeTrend.jsx
│   │   ├── AddExpense.jsx
│   │   ├── ExpenseLog.jsx
│   │   ├── ExpenseCategorical.jsx
│   │   ├── ExpenseTrend.jsx
│   │   ├── GroupExpenseLeft.jsx
│   │   ├── GroupExpenseRight.jsx
│   │   └── GoalComponent.jsx
│   ├── pages/
|   |   ├── templates/
|   │   │   ├── BaseTemplate.jsx
│   │   ├── HomePage.jsx
│   │   ├── IncomePage.jsx
│   │   ├── ExpensePage.jsx
│   │   ├── GroupPage.jsx
│   │   └── GoalPage.jsx
│   ├── db/
│   |   ├── myFirestoreDB.js         // Firebase initialization 
│   |   ├── myFirestoreTran.js       // Firestore CRUD for transactions
│   |   ├── myFirestoreGroups.js     // Firestore CRUD for groups
│   |   ├── myFirestoreGoals.js      // Firestore CRUD for goals
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
```

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Resources
  - React Bootstrap: https://react-bootstrap.netlify.app/
  - chart.js: https://www.chartjs.org/docs/latest/
  - **AI Usage:**
    - ChatGPT(4o/o3-mini-high)
      - Used for project overview and core functionality
        - Prompt: 
          I want to create a financial management tool. The platform supports expense sharing and collaboration among groups, provides detailed categorical insights to help users understand their spending habits, and enables robust financial goal setting with state tracking based on income and expenses.
            Features:
            - Track expenses, categorize spending, and visualize financial trends
            - Expense Sharing and Collaboration
            - Categorical Insights
            - Financial Goal Setting and State Tracking

            User Stories:
            - As a user, I want to see my daily expenses so that I can track where my money goes.
            - As a user,  I want to categorize transactions and see how my spending is distributed over different categories and time periods so that I can analyze my spending habits and identify areas to cut back.
            - As a group planner, I want to track shared expenses with my friends so that we can manage our event budgets effectively.
            - As a financially conscious user, I want to set clear savings or debt reduction goals and keep track of my financial state so that I can adjust my spending habits and achieve my targets more effectively.
      - Used for personas and user stories
        - Prompt: Create 3 User personas based on the main features and some user stories per persona
      - Used for debugging
        - Prompt: (code) (Error) Help me fix the error
      - Used for writing README.md(Features, etc)
        - Prompt: write a README for my project(Feature, structure, etc)
      - Used for writing hypothetical example in FP_Demonstration.md
        - Prompt: (code) Provide an hypothetical example that would break the concept
        - Verified through understanding the concepts
