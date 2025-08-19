## FGH D365 Automated Testing Framework

The **FGH D365 Automated Testing Framework** provides a consistent, maintainable, and scalable approach for **UI test automation** across Dynamics 365 projects.  

It is designed using **Playwright + TypeScript** and follows a modular structure:  

- **Automation Core** → Browser management, custom helpers, utilities, fixtures  
- **Automation Framework** → Page objects, step definitions, data handling, and test execution setup  

---

## Setup

### Mandatory Install Requirements  

Ensure the following are installed before running the tests:  

- [Node.js](https://nodejs.org/en/download/) (version **18+**)  
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) or [yarn](https://yarnpkg.com/)  
- [Google Chrome / Edge / Chromium / Firefox / WebKit] (Playwright supports multiple browsers)  

### Optional (for Development)  

- [Visual Studio Code](https://code.visualstudio.com/) (recommended IDE)  
- Extensions:  
  - **Playwright Test for VSCode**  
  - **Prettier** (for code formatting)  
  - **ESLint**  

---

## Installation

Clone the repo locally:  

```bash
git clone git@gitprime.ottouk.com:quality-assurance/d365-automated-tests.git
cd d365-automated-tests
 
Install dependencies:
 
Run npm install or npm i
 
Install Playwright browsers:
 
Run npx playwright install
 
---
 ```

## How To Run

After installing dependencies and Playwright browsers, you can execute tests using the following commands:

```
```

### Run Specific Test File

```bash
npx playwright test path/to/testfile.spec.ts
```

### Run Tests with a Specific Tag

```bash
npx playwright test --grep @yourTag
```

### Generate and View HTML Test Report

```bash
npx playwright show-report
```

### Run All Tests (default)  

```bash
npx playwright test
