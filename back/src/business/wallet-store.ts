
import {Web3Account, privateKeyToAccount, create, TypedTransaction} from "web3-eth-accounts";
import { IWalletStore } from "../interfaces/business";

export class WalletStoreImpl implements IWalletStore {
  private keys: Record<string, Web3Account>;
  constructor() {
    this.keys = {};
  }
  
  add(key: string): Web3Account {
    const w = privateKeyToAccount(key);
    this.keys[w.address] = w;
    return w;
  }
  
  newWallet(): Web3Account {
    const w = create();
    return this.add(w.privateKey);
  }
  
  get(address: string): Web3Account | undefined {
    return this.keys[address];
  }
  
  list(): string[] {
    return Object.keys(this.keys);
  }
  
  signTx(address: string, tx: TypedTransaction): Promise<string> {
    throw new Error("Method not implemented.");
  }
}