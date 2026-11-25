// One-Line Office Joke Laugh-Off — entry generator (Node stdlib only).
// Writes a single original one-line office joke to /output/entry.txt.
//
// The joke: a loyal office-plant waterer resigns and discovers the plant
// got the farewell party while they got the cardboard box — a reversal
// built on one concrete object (the office plant), first-person voice,
// and a punchline that flips the first clause's expectation.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "I watered the office plant for three years; when I resigned, they threw the plant a farewell party and handed me a cardboard box.";

const MIN_CHARS = 1;
const MAX_CHARS = 200;

function main(): void {
  // Gate: the sealed scorer requires UTF-8 text of 1-200 characters,
  // not only whitespace, and the judge requires a single line.
  const chars = [...JOKE].length;
  if (chars < MIN_CHARS || chars > MAX_CHARS) {
    throw new Error(`entry length ${chars} chars outside ${MIN_CHARS}-${MAX_CHARS}`);
  }
  if (JOKE.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (JOKE.includes("\n") || JOKE.includes("\r")) {
    throw new Error("entry must be a single line");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), JOKE + "\n", "utf8");
  // Deterministic by construction: a fixed string, no input, no clock,
  // no randomness — every run writes byte-identical output.
  console.log(`wrote entry.txt (${chars} chars)`);
}

main();
