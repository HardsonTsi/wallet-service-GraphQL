export class Currency {

    code: string;
    name: string;
    symbol: string;
    salePrice: number;
    purchasePrice: number;
}

export class Wallet {
    id: string;
    balance: number;
    createAt: number;
    userId: string;
    currency: Currency;
    walletTransactions: WalletTransaction[];
}

export class WalletTransaction {
    id: number;
    timestamp: number;
    amount: number;
    saleCurrencyPrice: number;
    purchaseCurrencyPrice: number;
    wallet: Wallet;
    type: TransactionType
}

export enum TransactionType {
    DEBIT, CREDIT
}

export class WalletDTO {
    balance: number;
    currencyCode: string;
}

export class TransferDTO {
    sourceId: string;
    destinationId: string;
    amount: number;
}