# NYT best sellers
This application uses [NYT Books API](https://developer.nytimes.com/docs/books-product/1/overview) to present the best sellers ranking in a clean and practical way. Navigate between NYT-curated best sellers lists and keep track of each book's ranking history.

### Features
- React (Vite)
- Typescript
- Eslint
- Axios
- React-Query (server state)
- Tailwind
- shadcn-ui (component lib)

### Running the app
The app uses Vite to run the development environment - [Node.js (+16) required](https://vitejs.dev/guide/#scaffolding-your-first-vite-project)

#### 1. Clone the repo into your machine
```sh
git clone git@github.com:shoxton/nyt-books-bestsellers.git
```
#### 2. Setup environment
cd into the app folder and copy `.env.example` into `.env` and paste your NYT Books api-key as your `VITE_API_KEY` variable
```sh
cd nyt-books-bestsellers/
```
```sh
cp .env.example .env
```
#### 3. Install dependencies and start dev server
Run `npm install` to install the project dependencies. After that, you can run `npm run dev` and access it on http://localhost:5173/
