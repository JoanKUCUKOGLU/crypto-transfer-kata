
import {Web3Account, privateKeyToAccount, TypedTransaction, signTransaction} from "web3-eth-accounts";

export class WalletStoreImpl {
  private keys: Record<string, Web3Account>;
  constructor() {
    this.keys = {};
  }

  add(key: string) {
    const w = privateKeyToAccount(key);
    this.keys[w.address] = w;
  }

  async signTx(address: string, tx: TypedTransaction): Promise<string> {
    const w = this.keys[address];
    if (!w) throw new Error("The address does not have a private key here");
    const signedTx = await signTransaction(tx, w.privateKey);
    return signedTx.rawTransaction;
  }
}