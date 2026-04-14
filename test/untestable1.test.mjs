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
});
