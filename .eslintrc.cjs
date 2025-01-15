module.exports = {
 root: true,
 env: { browser: true, es2020: true },
 extends: [
   "eslint:recommended",
   "plugin:@typescript-eslint/recommended",
   "plugin:react-hooks/recommended",
   "plugin:prettier/recommended",
 ],
 parser: "@typescript-eslint/parser",
 plugins: ["react-refresh"],
 rules: {
   "@typescript-eslint/no-explicit-any": "warn",
   "react-refresh/only-export-components": [
     "warn",
     { allowConstantExport: true },
   ],
   "prettier/prettier": [
     "error",
     {
       singleQuote: true,
       semi: false,
       endOfLine: 'auto',
     },
   ],
 },
};
