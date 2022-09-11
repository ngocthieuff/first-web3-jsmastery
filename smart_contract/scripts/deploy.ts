import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";

const main =  async() => {
  const transactionsFactory = await ethers.getContractFactory("Transactions");
  const transactionsContract = await transactionsFactory.deploy();

  await transactionsContract.deployed();

  console.log("Transactions address: ", transactionsContract.address);
}

const runMain = async() => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

runMain();