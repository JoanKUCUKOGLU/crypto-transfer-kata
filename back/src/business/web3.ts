import W3, {Transaction} from "web3";
import { Web3Account } from "web3-eth-accounts"
import { IWeb3 } from "../interfaces/business";

export class Web3 implements IWeb3 {
  private w3: W3;
  constructor(private rpc: string) { 
    this.w3 = new W3(rpc);
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
}