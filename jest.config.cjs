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
    reporters: [
        'default',
        ['jest-junit', { outputDirectory: 'test-results', outputName: 'junit.xml' }],
    ],
}

module.exports = config
