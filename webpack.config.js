const path = require("path");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const bundleOutputDir = "./dist";
const bundleOutputDirDemo = "./demo";

module.exports = (env, arg) => {
  return [
    {
      // entry: {
      //   app: "./src/index.js",
      // },
      entry: [
        './src/index.js',
        './src/styles/index.scss'
      ],
      mode: arg.mode,
      output: {
          filename: ({ chunk: { name } }) => {
            return (name === 'app' ? 'main.js' : '[name].js')
          },
          path: path.resolve(bundleOutputDir),
          libraryTarget: "var",
          umdNamedDefine: true,
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            include: path.resolve(__dirname, "src"),
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
          {
            test: /\.css$/i,
            include: path.resolve(__dirname, 'src'),
            use: ['style-loader', 'css-loader', 'postcss-loader'],
          },
          {
            test: /\.s[ac]ss$/i,
            use: [
              // Creates `style` nodes from JS strings
              "style-loader",
              // Translates CSS into CommonJS
              {
                loader: "css-loader",
                options: {
                  sourceMap: true,
                },
              },
              {
                // minify CSS và thêm autoprefix
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    plugins: ['autoprefixer'],
                  },
                  sourceMap: true,
                },
            },
              // Compiles Sass to CSS
              {
                loader: "sass-loader",
              }
            ],
          },
          {
            test: /\.(png|jpe?g|gif)$/i,
            use: [
              {
                loader: "file-loader",
              },
            ],
          },
        ],
      },
      plugins: [
          new CopyWebpackPlugin(
            [
              {
                context: "./demo/",
                from: "*/.html",
                to: "",
                force: true,
              },
            ],
            {
              copyUnmodified: true,
            },
          ),
          new MiniCssExtractPlugin({
            filename: '[name].css',
          }),
      ],
      devServer: {
        historyApiFallback: true,
        contentBase: bundleOutputDirDemo,
        host: '0.0.0.0',
        port: 8080,
        clientLogLevel: "trace",
        open: false,
        watchOptions: {
          ignored: [
            path.resolve(__dirname, "./dist"),
            // path.resolve(__dirname, "./node_modules"),
          ],
        },
      },
    },
  ]
};
