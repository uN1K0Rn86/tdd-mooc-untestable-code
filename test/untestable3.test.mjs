import { describe, test } from "vitest";
import { expect } from "chai";
import { parseCsvData, parsePeopleCsv, readPeopleCsv } from "../src/untestable3-copy.mjs";

// example input:
// Loid,Forger,,Male
// Anya,Forger,6,Female
// Yor,Forger,27,Female

describe("Untestable 3: CSV file parsing", () => {
  test("reads the file correctly", async () => {
    const csvPath = new URL("./people.csv", import.meta.url);
    const fileRead = await readPeopleCsv(csvPath);
    expect(fileRead).to.contain("Anya");
  });

  test("parses a single person correctly", () => {
    const personString = "Anya,Forger,6,Female";

    const [person] = parseCsvData(personString);
    expect(person).to.deep.equal({ firstName: "Anya", lastName: "Forger", gender: "f", age: 6 });
  });

  test("parses multiple people correctly", () => {
    const peopleString = `Anya,Forger,6,Female
       Yor,Forger,27, Female
       Loid,Forger,,Male
      `;

    const people = parseCsvData(peopleString);
    expect(people).to.deep.equal([
      { firstName: "Anya", lastName: "Forger", gender: "f", age: 6 },
      { firstName: "Yor", lastName: "Forger", gender: "f", age: 27 },
      { firstName: "Loid", lastName: "Forger", gender: "m" },
    ]);
  });

  test("trims spaces correctly", () => {
    const personString = "Anya, Forger, 6, Female";

    const [person] = parseCsvData(personString);
    expect(person).to.deep.equal({ firstName: "Anya", lastName: "Forger", gender: "f", age: 6 });
  });

  test("skips empty lines", () => {
    const peopleString = `Anya,Forger,6,Female
    
       Yor,Forger,27, Female
       Loid,Forger,,Male
      `;

    const people = parseCsvData(peopleString);
    expect(people).to.deep.equal([
      { firstName: "Anya", lastName: "Forger", gender: "f", age: 6 },
      { firstName: "Yor", lastName: "Forger", gender: "f", age: 27 },
      { firstName: "Loid", lastName: "Forger", gender: "m" },
    ]);
  });

  test("full function reads input and returns parsed objects", async () => {
    const csvPath = new URL("./people.csv", import.meta.url);
    const people = await parsePeopleCsv(csvPath);
    expect(people).to.deep.equal([
      { firstName: "Loid", lastName: "Forger", gender: "m" },
      { firstName: "Anya", lastName: "Forger", gender: "f", age: 6 },
      { firstName: "Yor", lastName: "Forger", gender: "f", age: 27 },
    ]);
  });
});
