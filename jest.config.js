module.exports = {
    // For jest to understand JSX
    transform: {
        "^.+\\.(js|jsx)$": "babel-jest",
    },
    moduleFileExtensions: ["js", "jsx"],
    // This ensures that Jest uses a simulated DOM because, node does not have a DOM
    testEnvironment: 'jsdom',
    // Enables jest to use expect functions from react-testing-library
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
};
