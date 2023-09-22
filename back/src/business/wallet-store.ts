
import {Web3Account, privateKeyToAccount, TypedTransaction, signTransaction, create} from "web3-eth-accounts";

export class WalletStoreImpl {
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

  async signTx(address: string, tx: TypedTransaction): Promise<string> {
    const w = this.keys[address];
    if (!w) throw new Error("The address does not have a private key here");
    const signedTx = await signTransaction(tx, w.privateKey);
    return signedTx.rawTransaction;
  }
}