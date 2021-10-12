import { Command, flags } from "@oclif/command";

// @ts-ignore
import { version } from "../package.json";
import * as path from "path";
import { formatQueryFile } from "./formatter";
import { writeFileSync } from "fs";

class SparqlFormat extends Command {
  static description = "an opinionated sparql formatter";

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({ char: "v" }),
    help: flags.help({ char: "h" }),
    // flag with no value (-f, --force)
    "dry-run": flags.boolean({ char: "d" }),
  };

  static args = [
    {
      name: "file",
      required: true,
      description: "file to format",
      parse: (file: string) => path.resolve(file),
    },
  ];

  async run() {
    const { args, flags } = this.parse(SparqlFormat);

    if (args.version) {
      this.log(version);
      return;
    }

    const tic = new Date();
    const formatted = formatQueryFile(args.file);
    const toc = new Date();
    const diff = toc.getTime() - tic.getTime();
    this.log(`Formatted ${args.file} in ${diff / 1e6}s`);

    if (flags["dry-run"]) {
      this.log(formatted);
    } else {
      writeFileSync(args.file, formatted);
    }
  }

  async catch(error: any) {
    this.warn(error);
  }
}

export = SparqlFormat;
