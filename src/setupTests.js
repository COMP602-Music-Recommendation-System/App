// src/setupTests.js
import '@testing-library/jest-dom';

// Suppress ReactDOMTestUtils.act deprecation warning
const originalError = console.error;
beforeAll(() => {
  console.error = jest.fn((message, ...args) => {
    if (
      typeof message === 'string' &&
      message.includes('Warning: `ReactDOMTestUtils.act` is deprecated')
    ) {
      return;
    }
    originalError(message, ...args);
  });
});

afterAll(() => {
  console.error = originalError;
});