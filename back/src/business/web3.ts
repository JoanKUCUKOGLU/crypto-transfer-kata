import W3, { Transaction, Web3Context } from "web3";
import { prepareTransactionForSigning } from "web3-eth";
import { Web3Account, TypedTransaction } from "web3-eth-accounts";
import { IWeb3 } from "../interfaces/business";

export class Web3 implements IWeb3 {
  private w3: W3;
  constructor(private rpc: string) {
    this.w3 = new W3(rpc);
  }

  async getTransaction(id: string): Promise<Transaction> {
    return this.w3.eth.getTransaction(id);
  }

  async getBalance(address: string): Promise<string> {
    const b = await this.w3.eth.getBalance(address);
    return b.toString(10);
  }

  async createTransferTransaction(
    from: string,
    to: string,
    amount: bigint
  ): Promise<TypedTransaction> {
    const context = Web3Context.fromContextObject(
      this.w3.eth.getContextObject()
    );
    const tx = await prepareTransactionForSigning(
      { from, to, value: amount },
      context,
      undefined,
      true
    );

    return tx;
  }

  async sendSignedTransaction(rawTx: string): Promise<string> {
    return await new Promise((resolve, reject) => {
      this.w3.eth
        .sendSignedTransaction(rawTx)
        .once("transactionHash", (hash) => resolve(hash))
        .on("error", (error) => reject(error));
    });
  }
}
