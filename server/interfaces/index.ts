import { ObjectId } from "mongodb"

export interface Transaction {
	amount?: number
	type?: 'income' | 'expenses'
	description?: string
	accountId?: string
	category?: string
}

export interface Account {
	name: string
	color: string
	accountType: string
	startingAmount: number
	incomeByMonth: Array<number>
	expensesByMonth: Array<number>
}

export interface User {
	_id?: ObjectId
	name?: string
	username?: string
	password?: string
	transactions?: Array<Transaction>
	accounts?: Array<Account>
}