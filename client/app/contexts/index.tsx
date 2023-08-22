'use client'

import { ClientAccount, Transaction } from "@/interfaces";
import { createContext, useEffect, useState } from "react";

interface ContextInterface {
	isBusy: boolean,
	income: number,
	expenses: number,
	cashFlow: number,
	totalAmount: number,
	accounts: Array<ClientAccount>,
	transactions: Array<Transaction>,
	addTransaction: (amount: number, description: string, account: string, isIncome: boolean, category: string) => Promise<void>,
	addAccount: (name: string, color: string, accountType: string, startingAmount: number) => Promise<void>,
	error: string | boolean
}

export const context = createContext<ContextInterface | null>(null);

export const ContextProvider = ({children}: any) => {
	const [isBusy, setIsBusy] = useState(true);
	const [income, setIncome] = useState(0);
	const [expenses, setExpenses] = useState(0);
	const [cashFlow, setCashFlow] = useState(0);
	const [totalAmount, setTotalAmount] = useState(0);
	const [accounts, setAccounts] = useState<Array<ClientAccount>>([]);
  	const [transactions, setTransactions] = useState<Array<Transaction>>([]);
  	const [error, setError] = useState<string | boolean>(false);

	useEffect(() => {
		setError(false);
		if (window.localStorage.getItem("token")) {
			fetchData().then(res => {
				if (res) setIsBusy(false);
			})
		}
	}, [])

	const fetchData = async () => {
		const transactionRes = await fetch('http://localhost:3001/transactions', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': window.localStorage.getItem('token')!
			},
		})
		const transactionData = (await transactionRes.json())['transactions']

		const accountsRes = await fetch('http://localhost:3001/accounts', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': window.localStorage.getItem('token')!
			},
		})
		const accountData = (await accountsRes.json())['accounts'];

		_modifyData(transactionData, accountData);

		return true;
	}

	const _modifyData = (transactionData: Array<any>, accountData: Array<any>) => {
		let sumOfIncome = 0, sumOfExpenses = 0, sumOfStartingAmount = 0;
    		const newAccountData: Map<string | undefined, ClientAccount> = new Map();
    		const newClientAccount: Array<ClientAccount> = [];
		
		accountData.forEach(account => {
			const cAccount: ClientAccount = {
				color: account.color,
				income: 0,
				expenses: 0,
				name: account.name,
				accountType: account.accountType,
				startingAmount: parseFloat(account.startingAmount)
			}

			newAccountData.set(cAccount.name, cAccount);

			sumOfStartingAmount += parseFloat(account.startingAmount)
		})

		transactionData.forEach(transaction => {
			// If the transaction is an income, add its amount to the sumOfIncome variable
			if (transaction.type === 'income') sumOfIncome += parseFloat(transaction.amount);
			// If the transaction is an expense, add its amount to the sumOfExpenses variable
			else sumOfExpenses += parseFloat(transaction.amount);

			let acc = newAccountData.get(transaction.accountId);
			if (!acc) return;

			if (transaction.type === 'expenses') {
				acc.expenses += transaction.amount!;
			} else if (transaction.type === 'income') {
				acc.income += transaction.amount!;
			}

			newAccountData.set(acc.name, acc);		
		})

		newAccountData.forEach((v, k) => {
			newClientAccount.push(v);
		})

		setIncome(sumOfIncome);
		setExpenses(sumOfExpenses);
		setCashFlow(sumOfIncome - sumOfExpenses);
		setTotalAmount(sumOfStartingAmount + sumOfIncome - sumOfExpenses);
    		setAccounts(newClientAccount);
      		setTransactions(transactionData);
	}

	const addTransaction = async (amount: number, description: string, account: string, isIncome: boolean, category: string) => {
		// Check if all required fields are filled
		if (!amount || !description || !account || !category) {
			setError('missing required fields')
			return;
		}

		// Send a POST request to the server with the new account data
		const res = await fetch('http://localhost:3001/transactions', {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				'Authorization': window.localStorage.getItem('token')!
			},
			body: JSON.stringify({
				transaction: {
					description: description,
					accountId: account,
					amount: amount,
					type: isIncome ? 'income' : 'expenses',
					category: category
				}
			})
		})

	// If the request is successful, redirect to the main page
		if (res.ok) {
			window.location.href = '/main/home';
		} else {
			setError('Unexpected error occurred. Please wait for some time and try again.')
		}
	}

	const addAccount = async (name: string, color: string, accountType: string, startingAmount: number) => {
		// Check if all required fields are filled
		if (!name || !color || !accountType || !startingAmount) {
			setError('missing required fields');
			return;
		}

		// Send a POST request to the server with the new account data
		const res = await fetch('http://localhost:3001/accounts', {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				'Authorization': window.localStorage.getItem('token')!
			},
			body: JSON.stringify({
				account: {
				name: name,
				color: color,
				accountType: accountType,
				startingAmount: startingAmount
				}
			})
		})

		// If the request is successful, redirect to the main page
		if (res.ok) {
			window.location.href = '/main/accounts';
		} else {
			setError('Unexpected error occurred. Please wait for some time and try again.')
		}
	}

	return (
		<context.Provider value={{
			isBusy,
			income,
			expenses,
			cashFlow,
			totalAmount,
			accounts,
			transactions,
			addTransaction,
			addAccount,
			error
		}}>
			{children}
		</context.Provider>
	)
}