import '@testing-library/jest-dom'

import { TextEncoder, TextDecoder } from 'util';

// Polyfill TextEncoder / TextDecoder for Jest environment
if (!global.TextEncoder) {
  global.TextEncoder = TextEncoder;
}
if (!global.TextDecoder) {
  global.TextDecoder = TextDecoder;
}