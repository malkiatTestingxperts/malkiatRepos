## FGH D365 Automated Testing Framework

The **FGH D365 Automated Testing Framework** provides a consistent, maintainable, and scalable approach for **UI test automation** across Dynamics 365 projects.  

It is designed using **Playwright + TypeScript** and follows a modular structure:  

- **Automation Core** → Browser configuration, Environment configuration with playwright.config.ts, Custom helpers, utilities
- **Automation Framework** → Page objects, Test Cases, data handling, and test execution setup  

---

## Setup

### Mandatory Install Requirements  

Ensure the following are installed before running the tests:  

- [Node.js](https://nodejs.org/en/download/) (version **20+**)  
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) or [yarn](https://yarnpkg.com/)  
- [Google Chrome / Edge / Chromium / Firefox / WebKit] (Playwright supports multiple browsers)  

### IDE

- [Visual Studio Code](https://code.visualstudio.com/) (recommended IDE)  
- Extensions:  
  - **Playwright Test for VSCode**  
  - **Prettier** (for code formatting)  
  - **ESLint**  

---

### How to configure

### Clone the Repository  

```bash
git clone git@gitprime.ottouk.com:quality-assurance/d365_automation.git
cd d365_automation

```

### Install dependencies

```bash
Run npm install or npm i
```

### Install Playwright browsers

```bash
Run npx playwright install
```

### How To Run

After installing dependencies and Playwright browsers, you can execute tests using the following commands:

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

```

### Directory Structure

- **pages/** → Page Object Models (POM) for D365 modules  
- **tests/** → Test specs (UAT, regression)  
- **session/** → Authentication session-storage to run test cases with live user credentials  
- **test-data/** → Test data files used across multiple test cases  
- **playwright-report/** → Auto-generated `.html` execution reports  
- **utils/** → Helper functions and common utilities  
- **playwright.config.ts** → Global configuration file (timeouts, browser type, headless/headed mode, etc.)  

---

### Configuration

Framework configuration is managed via **playwright.config.ts**:  

- Browser & viewport settings  
- Retries and timeouts  
- Reporters (HTML, Allure, JUnit, etc.)  

## Jenkins Pipeline

The framework includes a `Jenkinsfile` for CI/CD integration.  
This file defines the pipeline stages required to run Playwright tests in Jenkins.  

### Pipeline Overview

- **Checkout Code** – Pull the latest version of the repository  
- **Install Dependencies** – Run `npm install`  
- **Install Browsers** – Run `npx playwright install --with-deps`  
- **Run Tests** – Execute `npx playwright test`  
- **Publish Report** – Archive Playwright test reports (HTML, JUnit, Allure if configured)  
