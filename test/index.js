import { execa } from "execa";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { blue, green, red, bold, inverse } from "kleur/colors";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const schemas = {
	"yazi-default.toml": "yazi.json",
	"keymap-default.toml": "keymap.json",
	"theme-dark.toml": "theme.json",
	"theme-light.toml": "theme.json",
};

let errors = 0;

for (const [file, schema] of Object.entries(schemas)) {
	try {
		await execa("taplo", [
			"check",
			"--schema",
			pathToFileURL(join(__dirname, "../schemas/", schema)).toString(),
			`yazi/yazi-config/preset/${file}`,
		]);
		console.log(
			`${bold(
				inverse(green(" SUCCESS ")),
			)} No issues found with ${file} and ${schema}`,
		);
	} catch (error) {
		console.log(error.stderr);
		console.log(
			`${bold(
				inverse(red(" ERROR ")),
			)} Issue(s) found with ${file} and ${schema}: ${bold(error.command)}`,
		);
		errors++;
	}
}

console.log(
	`\n\t${bold(inverse(blue(" SUMMARY ")))} ${errors} issue(s) found.\n`,
);
process.exit(errors > 0 ? 1 : 0);
