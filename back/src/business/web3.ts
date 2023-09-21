import W3, {Transaction, Web3Context} from "web3";
import {prepareTransactionForSigning} from "web3-eth"
import { Web3Account, TypedTransaction, Common } from "web3-eth-accounts"
import { IWeb3 } from "../interfaces/business";

export class Web3 implements IWeb3 {
  private w3: W3;
  private common?: Common;
  constructor(private rpc: string) { 
    this.w3 = new W3(rpc);
  }

  private async initCommom() {
    if (!this.common) {
      this.common = new Common({
        chain: await this.w3.eth.getChainId(),
      })
    }
  }

  async getTransaction(id: string): Promise<Transaction> {
    return this.w3.eth.getTransaction(id);
  }

  newWallet(): Web3Account {
    return this.w3.eth.accounts.create();
  }

  walletFromPrivateKey(privateKey: string): Web3Account {
    return this.w3.eth.accounts.privateKeyToAccount(privateKey);
  }

  async getBalance(address: string): Promise<string> {
    const b = await this.w3.eth.getBalance(address);
    return b.toString(10);
  }

  async createTransferTransaction(from: string, to: string, amount: bigint): Promise<TypedTransaction> {

    
    const context = Web3Context.fromContextObject(this.w3.eth.getContextObject());
    const tx = await prepareTransactionForSigning(
      {from, to, value: amount},
      context, undefined, true
    )

    return tx;
  }

  async sendSignedTransaction(rawTx: string): Promise<string> {
    const promi = this.w3.eth.sendSignedTransaction(rawTx)
    console.log("sent transaction details", promi)
    return await new Promise((res, rej)=>{
      promi.once("transactionHash", res);
      promi.once("error", rej);
    })
  }
}