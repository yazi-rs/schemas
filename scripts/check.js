import { execa } from "execa";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { bgGreen, bgRed, bold } from "kleur/colors";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const schemas = {
	"yazi.toml": "yazi.schema.json",
	"keymap.toml": "keymap.schema.json",
};

for (const [file, schema] of Object.entries(schemas)) {
	try {
		await execa("taplo", [
			"check",
			"--schema",
			pathToFileURL(join(__dirname, "../schemas/", schema)),
			`test/${file}`,
		]);
		console.log(
			`${bgGreen(" SUCCESS ")} No issues found with ${file} and ${schema}`
		);
	} catch (error) {
		console.log(
			`${bgRed(" ERROR ")} Issue(s) found with ${file} and ${schema}: ${bold(
				error.command
			)}`
		);
		console.log(error.stderr);
	}
}
