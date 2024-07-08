// const js = require("@eslint/js"); //<---es5
import js from '@eslint/js';
// module.exports = [ //<---es5
export default [
    js.configs.recommended,

    {
        rules: {
            "no-unused-vars": "error",
            "no-undef": "warn"
        }
    }
];