import { Transaction } from "web3"

export interface IWeb3 {
  getTransaction(id: string): Promise<Transaction>;
}

export interface BusinessLogic {
  web3: IWeb3
}