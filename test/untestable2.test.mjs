import { describe, test } from "vitest";
import { expect } from "chai";
import { diceHandValue } from "../src/untestable2-copy.mjs";

describe("Untestable 2: a dice game", () => {
  test("returns a number", () => {
    expect(diceHandValue()).to.be.a("number");
  });

  test("a pair of sixes returns 106", () => {
    expect(diceHandValue(6, 6)).to.be.equal(106);
  });

  test("different die results return the high die", () => {
    expect(diceHandValue(4, 5)).to.be.equal(5);
  });

  test("returns all possible values after running 100000 times", () => {
    const results = [];
    for (let i = 0; i < 100000; i++) {
      results.push(diceHandValue());
    }
    expect(results).to.include(2);
    expect(results).to.include(3);
    expect(results).to.include(4);
    expect(results).to.include(5);
    expect(results).to.include(6);
    expect(results).to.include(101);
    expect(results).to.include(102);
    expect(results).to.include(103);
    expect(results).to.include(104);
    expect(results).to.include(105);
    expect(results).to.include(106);
  });

  test("returns all possible values deterministically", () => {
    const results = new Set();

    for (let d1 = 1; d1 <= 6; d1++) {
      for (let d2 = 1; d2 <= 6; d2++) {
        results.add(diceHandValue(d1, d2));
      }
    }

    expect([...results].sort((a, b) => a - b)).to.deep.equal([2, 3, 4, 5, 6, 101, 102, 103, 104, 105, 106]);
  });
});
