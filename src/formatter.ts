import { Parser, Generator, ParserOptions, GeneratorOptions } from "sparqljs";
import { PathLike, readFileSync } from "fs";

export function formatQueryString(
  query: string,
  parserOptions: ParserOptions = {
    sparqlStar: true,
  },
  generatorOptions: GeneratorOptions = {
    sparqlStar: true,
  }
): string {
  const parser = new Parser(parserOptions);
  const generator = new Generator(generatorOptions);
  return generator.stringify(parser.parse(query));
}

export function formatQueryFile(file: PathLike) {
  const query = readFileSync(file).toString();
  return formatQueryString(query);
}
