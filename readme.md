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


```console
cd smart_contract

npm init -y //initialize an empty package json

npm install --save-dev hardhat @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers

npx hardhat

npx hardhat test

npm install --save-dev @nomiclabs/hardhat-ethers 'ethers@^5.0.0'
// usage: deploy.ts
// import "@nomiclabs/hardhat-ethers";
// import { ethers } from "hardhat";


```