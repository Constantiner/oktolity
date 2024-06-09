// @ts-check

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/environment.js");

/** @type {import("next").NextConfig} */
const config = {
	experimental: {
		reactCompiler: true,
		ppr: true
	}
};

export default config;
