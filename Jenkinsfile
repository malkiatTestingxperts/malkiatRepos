// // pipeline {
// //   agent any

// //   stages {
// //     stage('Install') {
// //       steps {
// //         bat 'npm ci'
// //         bat 'npx playwright install'
// //       }
// //     }

// //     stage('Test') {
// //       steps {
// //         bat 'npm run test -- tests/UAT_01_P2P_NonCapex.spec.ts --workers=4'
// //         bat 'npm run test -- tests/UAT_02_P2P_Capex.spec.ts --workers=4'
// //         bat 'npm run test -- tests/UAT_03_FixedAsset.spec.ts --workers=4'
// //         bat 'npm run test -- tests/UAT_04_AccountPayable.spec.ts --workers=4'
// //         bat 'npm run test -- tests/UAT_AccountReceivable.spec.ts --workers=4'
// //         bat 'npm run test -- tests/UAT_06_GeneralLedger.spec.ts --workers=4'
// //         bat 'npm run test -- tests/UAT_07_CashBankManagement.spec.ts --workers=4'
// //      }
// //     }
// //   }

// //   post {
// //     // always {
// //     //   archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true
// //     // }

// //       always {
// //     archiveArtifacts artifacts: 'playwright-report/**/*', fingerprint: true
// //     publishHTML(target: [
// //       reportName: 'Playwright Report',
// //       reportDir: 'playwright-report',
// //       reportFiles: 'index.html',
// //       keepAll: true,
// //       alwaysLinkToLastBuild: true,
// //       allowMissing: false,
// //       allowScript: true 
// //     ])
// //   }
// //   }
// // }

// pipeline {
//   agent any

//   stages {
//     stage('Install') {
//       steps {
//         bat 'npm ci'
//         bat 'npx playwright install'
//       }
//     }

//     stage('Run Dependent Tests Sequentially') {
//       steps {
//         // Run only dependent tests in order
//         bat 'npx playwright test tests/UAT_01_P2P_NonCapex.spec.ts --workers=1'
//         bat 'npx playwright test tests/UAT_04_AccountPayable.spec.ts --workers=1'
//         bat 'npx playwright test tests/UAT_AccountReceivable.spec.ts --workers=1'
//       }
//     }

//     stage('Run Independent Tests in Parallel') {
//       parallel {
//         stage('UAT_02_P2P_Capex') {
//           steps {
//             bat 'npx playwright test tests/UAT_02_P2P_Capex.spec.ts --workers=4'
//           }
//         }
//         stage('UAT_03_FixedAsset') {
//           steps {
//             bat 'npx playwright test tests/UAT_03_FixedAsset.spec.ts --workers=4'
//           }
//         }
//         stage('UAT_06_GeneralLedger') {
//           steps {
//             bat 'npx playwright test tests/UAT_06_GeneralLedger.spec.ts --workers=4'
//           }
//         }
//         stage('UAT_07_CashBankManagement') {
//           steps {
//             bat 'npx playwright test tests/UAT_07_CashBankManagement.spec.ts --workers=4'
//           }
//         }
//       }
//     }
//   }

//   post {
//     always {
//       archiveArtifacts artifacts: 'playwright-report/**/*', fingerprint: true
//       publishHTML(target: [
//         reportName: 'Playwright Report',
//         reportDir: 'playwright-report',
//         reportFiles: 'index.html',
//         keepAll: true,
//         alwaysLinkToLastBuild: true,
//         allowMissing: false,
//         allowScript: true 
//       ])
//     }
//   }
// }

pipeline {
  agent any

  stages {
    stage('Install') {
      steps {
        bat 'npm ci'
        bat 'npx playwright install'
      }
    }

    stage('Run Dependent Tests Sequentially') {
      steps {
        script {
          catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
            bat 'npx playwright test tests/UAT_01_P2P_NonCapex.spec.ts --workers=1'
          }
          catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
            bat 'npx playwright test tests/UAT_04_AccountPayable.spec.ts --workers=1'
          }
          catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
            bat 'npx playwright test tests/UAT_AccountReceivable.spec.ts --workers=1'
          }
        }
      }
    }

    stage('Run Independent Tests in Parallel') {
      parallel {
        stage('UAT_02_P2P_Capex') {
          steps {
            catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
              bat 'npx playwright test tests/UAT_02_P2P_Capex.spec.ts --workers=4'
            }
          }
        }
        stage('UAT_03_FixedAsset') {
          steps {
            catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
              bat 'npx playwright test tests/UAT_03_FixedAsset.spec.ts --workers=4'
            }
          }
        }
        stage('UAT_06_GeneralLedger') {
          steps {
            catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
              bat 'npx playwright test tests/UAT_06_GeneralLedger.spec.ts --workers=4'
            }
          }
        }
        stage('UAT_07_CashBankManagement') {
          steps {
            catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
              bat 'npx playwright test tests/UAT_07_CashBankManagement.spec.ts --workers=4'
            }
          }
        }
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'playwright-report/**/*', fingerprint: true
      publishHTML([
        reportDir: 'playwright-report',
        reportFiles: 'index.html',
        reportName: 'Playwright Report',
        keepAll: true,
        alwaysLinkToLastBuild: true,
        allowMissing: false
      ])
    }
  }
}
