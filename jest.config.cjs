/** @type {import('jest').Config} */
const config = {
    testEnvironment: 'node',
    transform: {
        '^.+\\.tsx?$': [
            'ts-jest',
            {
                tsconfig: {
                    esModuleInterop: true,
                    verbatimModuleSyntax: false,
                },
            },
        ],
    },
    collectCoverageFrom: [
        'src/utils/**/*.ts',
        '!src/utils/**/*.test.ts',
    ],
    coverageThreshold: {
        global: {
            lines: 80,
            functions: 80,
            branches: 80,
            statements: 80,
        },
    },
    coverageReporters: ['text', 'lcov', 'html'],
    reporters: [
        'default',
        ['jest-junit', { outputDirectory: 'test-results', outputName: 'junit.xml' }],
    ],
}

module.exports = config
