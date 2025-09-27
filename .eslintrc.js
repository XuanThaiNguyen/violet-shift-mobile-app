module.exports = {
  root: true,
  extends: '@react-native',
  plugins: ['import'],
  rules: {
    'import/order': [
      'error',
      {
        alphabetize: {
          caseInsensitive: true,
          order: 'asc',
        },
        groups: [
          'internal',
          'external',
          'builtin',
          'index',
          'sibling',
          'parent',
        ],
        'newlines-between': 'always',
        pathGroups: [
          {
            group: 'external',
            pattern: 'react+(|-native)',
            position: 'before',
          },
          {
            group: 'external',
            pattern: 'react+(|-*)',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: [],
      },
    ],
  },
};
