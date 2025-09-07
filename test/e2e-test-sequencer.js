const Sequencer = require("@jest/test-sequencer").default;

class E2ETestSequencer extends Sequencer {
  sort(tests) {
    // Sort tests to run database test first, then others
    return tests.sort((a, b) => {
      if (a.path.includes("database.e2e-spec.ts")) return -1;
      if (b.path.includes("database.e2e-spec.ts")) return 1;
      return a.path.localeCompare(b.path);
    });
  }
}

module.exports = E2ETestSequencer;
