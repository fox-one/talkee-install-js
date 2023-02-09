import { uglify } from "rollup-plugin-uglify";

export default {
	input: 'src/main.js',
  plugins: [uglify()],
	output: {
		file: 'dist/ti.min.js',
		format: 'iife',
		name: 'tijs'
	}
};