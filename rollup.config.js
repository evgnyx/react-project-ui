// import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
// import commonjs from '@rollup/plugin-commonjs'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
// import postcss from 'rollup-plugin-postcss'
import babel from '@rollup/plugin-babel'
import copy from 'rollup-plugin-copy'

export default [
	{
    preserveModules: true,
    input: './src/index.tsx',
		// input: [
    //   'src/button/index.tsx',
    //   'src/text/index.tsx',
    // ],

    // manualChunks(id) {
    //   if (id.includes('node_modules')) {
    //     return 'vendor';
    //   }
    // },

    plugins: [
      peerDepsExternal(),
      resolve({ extensions: ['.js', '.jsx', '.ts', '.tsx'] }),
      // commonjs(),
			// typescript(),
      // postcss({
      //   // extract: 'index.css',
      //   extract: true,
      //   // modules: true,
      //   // plugins: []
      // }),
      copy({
        targets: [
          {
            src: 'src/**/*.scss',
            dest: 'dist/css',
          }
        ],
      }),
      babel({
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        exclude: './node_modules/**',
      }),
		],
		output: [
			{ dir: 'dist/cjs', format: 'cjs' },
			{ dir: 'dist/es', format: 'es' },
		],
	},
  // {
  //   // preserveModules: true,
  //   input: './src/css.ts',
  //   plugins: [
  //     // peerDepsExternal(),
  //     // resolve({ extensions: ['.js', '.jsx', '.ts', '.tsx'] }),
  //     // postcss({
  //     //   // extract: 'index.css',
  //     //   extract: true,
  //     //   // modules: true,
  //     //   // plugins: []
  //     // }),
  //     babel({
  //       extensions: ['.js', '.jsx', '.ts', '.tsx'],
  //       // exclude: './node_modules/**',
  //     }),
	// 	],
	// 	output: [
	// 		{ file: 'dist/css/index.css' },
	// 	],
  // }
]
