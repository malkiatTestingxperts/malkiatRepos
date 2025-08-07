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
        bat 'npx playwright test --workers=1'
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
      allowMissing: false
      allowScript: true 
    ])
  }
  }
}
