const reporter = require('multiple-cucumber-html-reporter');

reporter.generate({
  jsonDir: 'reports',                // Input JSON directory
  reportPath: 'reports/html',       // Output HTML directory
  metadata: {
    browser: {
      name: 'chrome',
      version: 'latest'
    },
    device: 'Local test machine',
    platform: {
      name: 'Windows',
      version: '10'
    }
  },
  customData: {
    title: 'Run Info',
    data: [
      { label: 'Project', value: 'Playwright + Cucumber Automation' },
      { label: 'Execution Start Time', value: new Date().toLocaleString() }
    ]
  }
});