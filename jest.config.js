module.exports = {
    globals: {
        'ts-jest': {
            tsConfig: './tsconfig.spec.json',
            diagnostics: true
        }
    },
    setupFiles: [
        '<rootDir>/test/setup.js'
    ],
    transform: {
        '^.+\\.ts$': 'ts-jest'
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js|ts)$',
    coveragePathIgnorePatterns: [
        '<rootDir>/dist/',
        '<rootDir>/node_modules/',
        '<rootDir>/out-tsc/',
        '<rootDir>/test/'
    ],
    moduleFileExtensions: [
        'ts',
        'js',
        'json',
        'node'
    ]
};
