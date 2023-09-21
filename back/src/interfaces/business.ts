import { Transaction } from "web3";
import { Web3Account, TypedTransaction } from "web3-eth-accounts";

export interface IWeb3 {
  getTransaction(id: string): Promise<Transaction>;
  newWallet(): Web3Account;
  createTransferTransaction(from: string, to: string, amount: bigint): Promise<TypedTransaction>;
  sendSignedTransaction(rawTx: string): Promise<string>;
}

export interface IWalletStore {
  add(key: string): void;
  signTx(address: string, tx: TypedTransaction): Promise<string>;
}

export interface BusinessLogic {
  web3: IWeb3;
  store: IWalletStore;
}