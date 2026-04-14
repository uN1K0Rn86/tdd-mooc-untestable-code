import { describe, test } from "vitest";
import { expect } from "chai";
import { daysUntilChristmas } from "../src/untestable1-copy.mjs";

describe("Untestable 1: days until Christmas", () => {
  test("is an integer", () => {
    expect(daysUntilChristmas()).to.be.a("number");
  });

  test("is 1 on christmas eve", () => {
    const now = new Date();
    const christmasEve = new Date(now.getFullYear(), 11, 24);
    expect(daysUntilChristmas(christmasEve)).to.be.equal(1);
  });

  test("is 30 on november 25", () => {
    const now = new Date();
    const nov25 = new Date(now.getFullYear(), 10, 25);
    expect(daysUntilChristmas(nov25)).to.be.equal(30);
  });

  test("is 0 on christmas day", () => {
    const xmas = new Date(2026, 11, 25);
    expect(daysUntilChristmas(xmas)).to.be.equal(0);
  });

  test("ignores time of day for the same date", () => {
    const morning = new Date(2026, 10, 14, 10, 0, 0);
    const evening = new Date(2026, 10, 14, 22, 0, 0);
    expect(daysUntilChristmas(morning)).to.be.equal(daysUntilChristmas(evening));
  });
});
