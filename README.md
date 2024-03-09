# Schemas

[JSON Schemas](https://json-schema.org/) for [Yazi](https://github.com/sxyazi/yazi) configuration files.

## Development

### Setup

```
git clone --recurse-submodules https://github.com/yazi-rs/schemas
pnpm install
```

### Structure

- `schemas/*.schema.json`: JSON Schemas for each configuration file.
- `test/*.toml`: The default TOML configuration files for testing.
- `scripts/*.js`: Scripts for managing and checking schemas.

## License

[MIT](LICENSE)
