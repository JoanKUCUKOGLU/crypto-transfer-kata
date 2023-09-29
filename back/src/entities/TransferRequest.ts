export class TransferRequest {
  fromWallet: string;
  toWallet: string;
  amount: bigint;

  constructor(fromWallet: string, toWallet: string, amount: bigint) {
    this.fromWallet = fromWallet;
    this.toWallet = toWallet;
    this.amount = amount;
  }
}
