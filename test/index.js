import { execa } from "execa";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { green, red, bold, inverse } from "kleur/colors";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const schemas = {
	"yazi-default.toml": "yazi.json",
	"keymap-default.toml": "keymap.json",
	"theme-dark.toml": "theme.json",
	"theme-light.toml": "theme.json",
};

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
		console.log(
			`${bold(
				inverse(red(" ERROR ")),
			)} Issue(s) found with ${file} and ${schema}: ${bold(error.command)}`,
		);
		console.log(error.stderr);
	}
}
