module.exports = {
  collectCoverageFrom: ["**/*.{js,jsx,ts,tsx}", "!**/*.d.ts", "!**/node_modules/**"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
    "^.+\\.(css|less)$": "jest-transform-stub",
  },
  transformIgnorePatterns: ["/node_modules/(?!(nav-.+)/)", "^.+\\.module\\.(css|sass|scss)$"],
  moduleNameMapper: {
    "^.+\\.module\\.(css|sass|scss|less)$": "identity-obj-proxy",
    "^.+\\.svg$": "jest-transform-stub",
    "@navikt/ds-react(.*)": "@navikt/ds-react/cjs$1",
    "@navikt/ds-icons(.*)": "@navikt/ds-icons/cjs$1",
  },
  testEnvironment: "jsdom",
};
