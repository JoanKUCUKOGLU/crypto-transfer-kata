import {
  TypedTransaction,
  Web3Account,
  create,
  privateKeyToAccount,
  signTransaction,
} from "web3-eth-accounts";
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
    const w = this.keys[address];

    return w;
  }

  list(): string[] {
    return Object.keys(this.keys);
  }

  async signTx(address: string, tx: TypedTransaction): Promise<string> {
    const w = this.get(address)!;

    const signed = await signTransaction(tx, w.privateKey);

    return signed.rawTransaction;
  }
}
