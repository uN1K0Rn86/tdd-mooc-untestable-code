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

    test("throws error when old password is wrong", async () => {
      try {
        await service.changePassword("moro", "wrong-password", "new-password");
        throw new Error("should fail");
      } catch (err) {
        expect(err.message).to.equal("wrong old password");
      }
    });
  });

  describe("PostgresUserDao", () => {
    let users;

    beforeEach(() => {
      users = new PostgresUserDao();
    });

    afterEach(async () => {
      await users.close();
    });

    test("allows new user to be created", async () => {
      const user = { userId: "101", passwordHash: "hash" };

      await users.save(user);
    });
  });
});
