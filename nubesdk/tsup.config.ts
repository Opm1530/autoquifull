import { defineConfig } from "tsup";

export default defineConfig({
	entry: { "ecoqui-nubesdk": "src/main.ts" },
	format: ["esm"],
	target: "es2022",
	clean: true,
	minify: true,
	// empacota o SDK junto — o arquivo final precisa ser autossuficiente
	noExternal: [/@tiendanube/],
	outDir: "dist",
});
