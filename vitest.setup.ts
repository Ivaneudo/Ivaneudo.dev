import { describe, it, expect, vi, beforeEach, beforeAll } from "vitest";
import { render } from "@testing-library/react";
import React from "react";
import { userDiv as UserDiv, userName as UserName } from "./styles";

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
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