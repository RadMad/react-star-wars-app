# Star Wars Characters

- Used Star Wars API (https://swapi.dev/) as the data source, implemented a SPA application with React and TypeScript consisting of two pages.
  - The main page displays a list or cards of characters, with pagination and search functionality using the API.
  - A detailed information page for the selected character. This page allows for editing and saving the character's information locally without sending it to the server.

* Neat layout
* Use of a Material UI framework
* Tests

**Tech Used:** Material, Vitest, Vite, ESLint, Prettier, IndexedDB with DexieJS, Vite-PWA plugin for PWA support, SWC for Fast Refresh

## React + TypeScript + Vite

For this project used Vite template initialization:

```sh
npx create-vite@latest
```

- selected react-ts template.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

As of July 2024, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Installation

1. Clone the repository:

   ```sh
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```sh
   cd <project-directory>
   ```

3. Install dependencies:
   ```sh
   npm install
   ```

## Running the Project

### Development

To start the development server with hot module replacement:

```sh
npm run dev
```

### Production

To build the project for production:

```sh
npm run build
```

To preview the production build:

```sh
npm run serve
```

### Linting and Formatting

To run ESLint:

```sh
npm run lint
```

To fix linting issues:

```sh
npm run lint:fix
```

### Testing

To run the tests:

```sh
npm run test
```

## Expanding the ESLint Configuration

For developing a production application, it is recommended to update the configuration to enable type-aware lint rules.

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## Additional Resources

- [Vite Documentation](https://vitejs.dev/guide/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [ESLint Documentation](https://eslint.org/docs/user-guide/getting-started)
