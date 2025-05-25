export default {
  displayName: 'shared-models',
  preset: '../../jest.preset.js',
  reporters: [
    'default',
    process.env['CI'] === 'true' ? 'jest-junit' : null, // Optionnel pour CI
  ].filter(Boolean),
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/libs/shared-models',
}
