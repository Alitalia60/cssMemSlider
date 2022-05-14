module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        'no-use-before-define': 1,
        'no-console': 0,
        'consistent-return': 'error',
        'no-var': 1,
        'no-pluplus': 0,
        'linebreak-style': 0,
        'max-classes-per-file': ['error', 5],
        'import/extensions': 0,
        indent: ['error', 4],
    },
    extends: 'airbnb-base',
};