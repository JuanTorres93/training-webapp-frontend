module.exports = {
    transform: {
        // For jest to understand JSX
        "^.+\\.(js|jsx)$": "babel-jest",
        // For jest to ignore CSS files
        "\\.(css|scss|sass)$": "jest-transform-stub",
    },
    transformIgnorePatterns: [
        // DOC: ChatGPT: ?! ... → Es una negación en regex, significa: "Si esto coincide, NO lo ignores" (es decir, transfórmalo con Babel).
        "node_modules/(?!(d3-.*|@nivo/.*|internmap.*|delaunator.*|robust-predicates)/)", // Transforma d3, nivo, internmap, delaunator y robust-predicates con Babel
    ],
    moduleFileExtensions: ["js", "jsx"],
    // This ensures that Jest uses a simulated DOM because, node does not have a DOM
    testEnvironment: 'jsdom',
    // Enables jest to use expect functions from react-testing-library
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
};
