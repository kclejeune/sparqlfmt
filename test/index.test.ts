import { expect, test } from "@oclif/test";
import { readFileSync } from "fs";

import cmd = require("../src");

describe("sparqlfmt", () => {
  test
    .stdout()
    .do(() => cmd.run(["test/queries/unformatted.sparql", "--dry-run"]))
    .it("formats the query correctly", (ctx) => {
      expect(ctx.stdout).to.contain(
        readFileSync("test/queries/formatted.sparql").toString().trim()
      );
    });

  test
    .stdout()
    .do(() => cmd.run(["test/queries/formatted.sparql", "--dry-run"]))
    .it("doesn't change a preformatted query", (ctx) => {
      expect(ctx.stdout).to.contain(
        readFileSync("test/queries/formatted.sparql").toString().trim()
      );
    });
});
