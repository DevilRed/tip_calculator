import * as matchers from "@testing-library/jest-dom/matchers";
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeAll, expect, vi } from "vitest";

expect.extend(matchers);
// Add TextEncoder/TextDecoder polyfills
import { TextDecoder, TextEncoder } from 'node:util';
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder as typeof global.TextDecoder

// Mock common browser APIs
beforeAll(() => {
 // Mock window properties
 Object.defineProperty(window, 'matchMedia', {
   writable: true,
   value: vi.fn().mockImplementation((query) => ({
     matches: false,
     media: query,
     onchange: null,
     addListener: vi.fn(),
     removeListener: vi.fn(),
     addEventListener: vi.fn(),
     removeEventListener: vi.fn(),
     dispatchEvent: vi.fn(),
   })),
 });
});

afterEach(() => {
  cleanup()
	vi.clearAllMocks();
})