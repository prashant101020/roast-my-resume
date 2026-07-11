// src/lib/polyfills.ts

/*
 * This polyfill is necessary to address a `ReferenceError: DOMMatrix is not defined`
 * that occurs when using `pdf.js` in a Node.js environment on Vercel.
 * The `pdf.js` library has a dependency on `DOMMatrix`, which is a browser-native API
 * and is not available on the server. By providing a basic mock implementation,
 * we prevent the application from crashing during server-side rendering or API route execution.
 */
if (typeof global.DOMMatrix === 'undefined') {
  // A basic mock implementation is sufficient to prevent the crash.
  // It doesn't need to replicate the full functionality of DOMMatrix.
  global.DOMMatrix = class DOMMatrix {
    constructor() {
      // The constructor can be empty as we only need the class to be defined.
    }
    // Add any methods that pdf.js might be calling, if necessary.
    // For now, an empty class is often enough.
  };
}
