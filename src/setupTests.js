// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock ResizeObserver. I think it is due to the fact that
// it is a function provided by the browser
global.ResizeObserver = class {
  constructor() { }
  observe() { }
  unobserve() { }
  disconnect() { }
};
