// Frontend-specific ESLint config (extends CRA's defaults)
module.exports = {
  root: true, // Stop looking for config in parent directories
  extends: ['react-app', 'react-app/jest'],
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }]
  }
};
