import React, { ProviderProps, useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

type ContextType = {
    connectWallet: (() => Promise<void>);
    currentAccount: string;
    formData: any;
    setFormData: any;
    handleChange: any;
    sendTransaction: (() => Promise<void>);
  };

export const TransactionContext = React.createContext<undefined | ContextType>(undefined);

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    console.log({
        provider,
        signer,
        transactionContract,
    })
}

export const TransactionProvider = ({ children } : { children: any }) => {

    const [currentAccount, setCurrentAccount] = useState("");
    const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('event', e.target.value)
        //setFormData((prevState) => ({ ...prevState, [name]: e.currentTarget.value }))
    }

    const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const enteredName = event.target.value;
        console.log(enteredName);
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
            console.log('send transactions');
            // get the data from the form...
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
    }

    return (
        <TransactionContext.Provider value={conttextType} >
            {children}
        </TransactionContext.Provider>
    )
} 