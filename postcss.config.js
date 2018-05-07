/**
* React Starter Kit (https://www.reactstarterkit.com/)
*
* Copyright © 2014-present Kriasoft, LLC. All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE.txt file in the root directory of this source tree.
*/

module.exports = () => ({
    // The list of plugins for PostCSS
    // https://github.com/postcss/postcss
    plugins: [

        // https://github.com/postcss/postcss-import
        require('postcss-import')(),

        // Add vendor prefixes to CSS rules using values from caniuse.com
        // https://github.com/postcss/autoprefixer
        require('autoprefixer')(/* package.json/browserslist */),
    ],
});
