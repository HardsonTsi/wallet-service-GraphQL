package com.hardtech.walletservice.services;

import com.hardtech.walletservice.entities.Currency;
import com.hardtech.walletservice.entities.TransactionType;
import com.hardtech.walletservice.entities.Wallet;
import com.hardtech.walletservice.entities.WalletTransaction;
import com.hardtech.walletservice.repositories.CurrencyRepository;
import com.hardtech.walletservice.repositories.WalletRepository;
import com.hardtech.walletservice.repositories.WalletTransactionRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.util.Random;
import java.util.UUID;
import java.util.stream.Stream;

@AllArgsConstructor
@Service
@Transactional
public class WalletService {
    private final WalletRepository walletRepository;
    private final CurrencyRepository currencyRepository;
    private final WalletTransactionRepository walletTransactionRepository;

    @PostConstruct
    public void loadDate() {
        Random random = new Random();

        //currency
        Stream.of("USD", "EUR", "XOF", "XAF", "AUD", "BSD")
                .forEach(currencyName -> {
                    Currency currency = Currency.builder()
                            .code(currencyName)
                            .symbol(currencyName)
                            .name(currencyName)
                            .salePrice(random.nextDouble() * 200)
                            .purchasePrice(random.nextDouble() * 300)
                            .build();
                    currencyRepository.save(currency);
                });

        //wallet
        currencyRepository.findAll()
                .forEach(currency -> Stream.of("Trust Wallet", "Binance", "Perfect Money", "Klever")
                        .forEach(wallet -> {
                            Wallet wallett = Wallet.builder()
                                    .id(UUID.randomUUID().toString())
                                    .balance(random.nextDouble() * 1000)
                                    .userId(UUID.randomUUID().toString())
                                    .currency(currency)
                                    .build();
                            walletRepository.save(wallett);
                        }));

        //walletTransactions
        walletRepository.findAll()
                .forEach(wallet -> {
                    for (int i = 0; i < 10; i++) {
                        WalletTransaction walletTransaction = WalletTransaction.builder()
                                .amount(random.nextDouble() * 500)
                                .type(random.nextInt() * 10 > 5 ? TransactionType.CREDIT : TransactionType.DEBIT)
                                .wallet(wallet)
                                .timestamp(random.nextLong())
                                .build();
                        walletTransactionRepository.save(walletTransaction);
                    }
                });
    }

}
