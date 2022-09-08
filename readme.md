```console

npm create vite@latest

// package name: client -> gen folder client
// React
// Typescript

cd client
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
// https://tailwindcss.com/docs/installation/using-postcss
// copy postcss.config.cjs manual if it is note auto generated
```

tailwindcss in react:
```typescript
    <h1 className="text-3xl font-bold underline">
    Hello world!
    </h1>
```