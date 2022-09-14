import React, { ProviderProps, useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

type ContextType = {
    connectWallet: (() => Promise<void>);
    currentAccount: string;
    formData: any;
    setFormData: any;
    handleChange: any;
    transactions: any;
    sendTransaction: (() => Promise<void>);
    getAllTransactions: (() => Promise<void>);
  };

export const TransactionContext = React.createContext<undefined | ContextType>(undefined);

const { ethereum } = window;

const createEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);
  
    return transactionsContract;
  };
  
const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    return transactionContract;
}

export const TransactionProvider = ({ children } : { children: any }) => {

    const [currentAccount, setCurrentAccount] = useState("");
    const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionsCount'));
    const [transactions, setTransactions] = useState([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, name: any) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    }

    const getAllTransactions = async () => {
        try {
          if (ethereum) {
            const transactionsContract = createEthereumContract();
    
            const availableTransactions = await transactionsContract.getAllTransactions();
    
            const structuredTransactions = availableTransactions.map((transaction: any) => ({
              addressTo: transaction.receiver,
              addressFrom: transaction.sender,
              timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
              message: transaction.message,
              keyword: transaction.keyword,
              amount: parseInt(transaction.amount._hex) / (10 ** 18)
            }));
    
            console.log(structuredTransactions);
    
            setTransactions(structuredTransactions);
          } else {
            console.log("Ethereum is not present");
          }
        } catch (error) {
          console.log(error);
        }
      };
    
    const checkIfWalletIsConnected = async () => {

        try {
            if(!ethereum) return alert("Please install metamask");
            const accounts = await ethereum.request({ method: 'eth_accounts' });
    
            if(accounts.length) {
                setCurrentAccount(accounts[0]);
                console.log('account: ', accounts[0]);
                // get all transactions
            } else {
                console.log('No accounts found');
            }    
        } catch (error) {
            console.log(error);
            throw new Error("No Ethereum object found.");
        }
    }

    const connectWallet = async () => {
        console.log('connectWallet() function in TransactionContext.tsx');
        try {
            if(!ethereum) return alert("Please install metamask");
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);
            throw new Error("No Ethereum object found.");
        }
    }

    const sendTransaction =  async () => {
        try {
            if(!ethereum) return alert("Please install metamask");
            
            const { addressTo, amount, keyword, message } = formData;
            const transactionContract = 
            getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);

            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208', // 21000 Gwei
                    value: parsedAmount._hex,
                }]
            });

            const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, keyword, message);

            setIsLoading(true);
            console.log(`Loading ${transactionHash.hash}`);
            
            await transactionHash.wait();

            setIsLoading(false);
            console.log(`Success ${transactionHash.hash}`);

            const transactionCount = await transactionContract.getTransactionCount();
            
            setTransactionCount(transactionCount.toNumber());

            console.log('transactionCount', transactionCount);
        } catch (error) {
            console.log(error);
            throw new Error("No Ethereum object found.");
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
    }, [])

    const conttextType: ContextType = {
        connectWallet: connectWallet,
        currentAccount: currentAccount,    
        formData: formData,
        setFormData: setFormData,
        handleChange: handleChange,
        sendTransaction: sendTransaction,
        transactions: transactions,
        getAllTransactions: getAllTransactions,
    }

    return (
        <TransactionContext.Provider value={conttextType} >
            {children}
        </TransactionContext.Provider>
    )
} 