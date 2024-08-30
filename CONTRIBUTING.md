# Contributing!

🎉 First of all, thanks for taking the time to contribute! 🎉

## Guidelines

The following is a set of guidelines for contributing to this repository. Use
your best judgment, and feel free to propose changes to this document in a pull
request.

> [!TIP]
> If it's your first time contributing to a project then you should look to the popular [first-contributions](https://github.com/firstcontributions/first-contributions) repository on GitHub. This will give you hands-on experience with the features of GitHub required to make a contribution.

- Create a [topic branch](https://git-scm.com/book/en/v2/Git-Branching-Branching-Workflows#_topic_branch) on your fork for your specific PR.
- Use the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) standard for creating explicit and meaningful commit messages. This repository requires pull request _titles_ to be in the conventional commit format, however we do not require it for individual commits within a pull request.

## Development environment setup

1. This repositories uses [Node.js](https://nodejs.org/en) and [pnpm](https://pnpm.io/) for linting and formatting the schemas. Make sure to have both installed.
2. Clone this repository and setup the `yazi` submodule (required for running the linter/tests).

   ```
   git clone --recurse-submodules https://github.com/yazi-rs/schemas
   ```

   If you've already cloned the repository without `--recurse-submodules`, you can instead run `git submodule update --init` while in the repository directory.

3. Run `pnpm install` to install the project's dependencies.

You can run the lint script using `pnpm lint`, which tests the schemas against the preset config from the `yazi` submodule, and the formatting script using `pnpm format`, which formats the files with [Prettier](https://prettier.io/).

## Updating schemas

The schemas are [JSON Schemas](https://json-schema.org/), and may be tricky to author if you lack experience. If you are new to JSON Schema, I would recommend reading [JSON Schema - What is a schema?](https://json-schema.org/understanding-json-schema/about) to get a basic introduction. The site [learnjsonschema.com](https://www.learnjsonschema.com/2020-12/) also has great examples and detailed specs for each keyword and how to use it.

The schemas in this repository use the `$defs` and `$ref` keywords extensively to re-use repeated schema components, so you may want to read through [JSON Schema - Structuring a complex schema](https://json-schema.org/understanding-json-schema/structuring) as well (though they become self-explanatory as you read through the schemas).

> [!IMPORTANT]
> These schemas currently only support the latest released version of Yazi. Unreleased changes will not be included in these schemas.

### Updating for a new Yazi release

When updating for a new Yazi release, you must make sure to update the Yazi submodule to update the test configuration files for the new version. This can be done by running the [`scripts/update-submodule.sh`](./scripts/update-submodule.sh) script with `./scripts/update-submodule.sh`.
