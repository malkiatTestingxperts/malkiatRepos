pipeline {
  agent any

  stages {
    stage('Install') {
      steps {
        bat 'npm ci'
        bat 'npx playwright install'
      }
    }

    stage('Test') {
      steps {
        bat 'npm run test -- tests/UAT_01_P2P_NonCapex.spec.ts'
        bat 'npm run test -- tests/UAT_02_P2P_Capex.spec.ts'
        bat 'npm run test -- tests/UAT_03_FixedAsset.spec.ts'
        bat 'npm run test -- tests/UAT_04_AccountPayable.spec.ts'
        bat 'npm run test -- tests/UAT_AccountReceivable.spec.ts'
        bat 'npm run test -- tests/UAT_06_GeneralLedger.spec.ts'
        bat 'npm run test -- tests/UAT_07_CashBankManagement.spec.ts'
     }
    }
  }

  post {
    // always {
    //   archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true
    // }

      always {
    archiveArtifacts artifacts: 'playwright-report/**/*', fingerprint: true
    publishHTML(target: [
      reportName: 'Playwright Report',
      reportDir: 'playwright-report',
      reportFiles: 'index.html',
      keepAll: true,
      alwaysLinkToLastBuild: true,
      allowMissing: false,
      allowScript: true 
    ])
  }
  }
}
