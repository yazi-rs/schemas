# Contributing!

🎉 First of all, thanks for taking the time to contribute! 🎉

> [!TIP]
> If it's your first time contributing to a project then you should look to the popular [first-contributions](https://github.com/firstcontributions/first-contributions) repository on GitHub. This will give you hands-on experience with the features of GitHub required to make a contribution.

## Guidelines

- Create a [topic branch](https://git-scm.com/book/en/v2/Git-Branching-Branching-Workflows#_topic_branch) on your fork for your specific PR.
- Use the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) standard for creating explicit and meaningful commit messages. This repository requires pull request _titles_ to be in the conventional commit format, however we do not require it for individual commits within a pull request.

## Development environment setup

1. This repositories uses [Node.js](https://nodejs.org/en) and [pnpm](https://pnpm.io/) for testing and formatting the schemas. Make sure to have both installed.
2. Clone this repository and setup the `yazi` submodule (required for running the tests).

   ```
   git clone --recurse-submodules https://github.com/yazi-rs/schemas
   ```

   If you have already cloned the repository without the `--recurse-submodules` argument, you can instead run `git submodule update --init` while in the repository directory to setup the submodules.

3. Run `pnpm install` to install the project's dependencies.

You can run the tests with `pnpm test`, which tests the schemas against the preset config from the `yazi` submodule, and the formatting script using `pnpm format`, which formats the files with [Prettier](https://prettier.io/).

## Updating schemas

The schemas are [JSON Schemas](https://json-schema.org/), and may be tricky to author if you lack experience. If you are new to JSON Schema, I would recommend reading [JSON Schema - What is a schema?](https://json-schema.org/understanding-json-schema/about) to get a basic introduction. The site [learnjsonschema.com](https://www.learnjsonschema.com/2020-12/) also has great examples and detailed specs for each keyword and how to use it.

The schemas in this repository use the `$defs` and `$ref` keywords extensively to re-use repeated schema components, so you may want to read through [JSON Schema - Structuring a complex schema](https://json-schema.org/understanding-json-schema/structuring) as well (though they become self-explanatory as you read through the schemas).

> [!IMPORTANT]
> These schemas currently only support the latest released version of Yazi. Unreleased changes will not be included in these schemas.

### General preferences

- Order properties of an object in the same order as they appear in the Yazi source code / preset configuration files.
- Be specific about the constraints of each option. If Yazi has a minimum/maximum value for a number, include that in the schema. This repository has some preset definitions in [`schemas/types/`](./schemas/types/) for the `u8`, `u16`, and `u32` types. You can set an option to use one of these types like this:

  ```json
  "some_option": { "$ref": "/schemas/types/u8.json" }
  ```

### Fixing a schema for the current Yazi version

#### Commit message

If you are fixing a single schema, use the commit message pattern of `fix(schemas/<schema>.json): <details>`, where `<schema>` is one of `keymap`, `theme`, or `yazi`, and `<details>` is a short but specific description of the changes made. For example, if you had added a missing `manager.sort_sensitive` option to [`schemas/yazi.json`](./schemas/yazi.json):

```
fix(schemas/yazi.json): add `manager.sort_sensitive` option
```

If you are fixing an issue or multiple issues across more than one schema, use the commit message pattern of `fix(schemas): <details>` (just fill out the details).

### Updating for a new Yazi release

When updating for a new Yazi release, you must update the Yazi submodule in order to test against the configuration files for the new version. This can be done by running the [`scripts/update-submodule.sh`](./scripts/update-submodule.sh) script with `./scripts/update-submodule.sh`.

My preferred strategy for reviewing the changes to files since the last release is to scroll through https://github.com/sxyazi/yazi/commits/shipped/yazi-config (the history for the `yazi-config/` directory, limited to only "shipped"/released commits) from the top and open any commits that (may have) introduced a new option or updated/removed an existing one. Continue scrolling and opening until reaching the commit with the tag of the previous version (the commit message should be something like `chore: bump version to x.y.z`).

Then review each of the opened commits for changes in the `yazi-config/` directory. It is important to check every matching commit thoroughly, since the schema tests are only run against the preset files (which may not have every possible configuration scenario/option included). After updating the schemas for the relevant commits you have found, run the tests against the updated submodule and fix any issues raised by the tests.

#### Commit message

Use the commit message pattern `feat: update schemas and submodule for v<version>`, where `<version>` is the version of Yazi you are updating the schemas for (e.g. `0.3.2`).
