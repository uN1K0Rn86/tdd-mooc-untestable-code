import { afterEach, beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import argon2 from "@node-rs/argon2";
import { PasswordService, PostgresUserDao } from "../src/untestable4-copy.mjs";

describe("Untestable 4: enterprise application", () => {
  describe("PasswordService", () => {
    let fakeUsers;
    let service;

    beforeEach(() => {
      fakeUsers = {
        user: { userId: "moro", passwordHash: argon2.hashSync("old-password") },
        getById: async function (userId) {
          return userId === this.user.userId ? this.user : null;
        },
        save: async function (user) {
          this.user = user;
        },
      };

      service = new PasswordService(fakeUsers);
    });
    test("changes password when old password is correct", async () => {
      await service.changePassword("moro", "old-password", "new-password");
      expect(argon2.verifySync(fakeUsers.user.passwordHash, "new-password")).to.equal(true);
    });
  });
});
