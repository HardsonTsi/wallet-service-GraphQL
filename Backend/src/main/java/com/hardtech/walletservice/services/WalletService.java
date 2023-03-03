package com.hardtech.walletservice.services;

import com.hardtech.walletservice.dtos.TransferDTO;
import com.hardtech.walletservice.dtos.WalletDTO;
import com.hardtech.walletservice.entities.Currency;
import com.hardtech.walletservice.entities.TransactionType;
import com.hardtech.walletservice.entities.Wallet;
import com.hardtech.walletservice.entities.WalletTransaction;
import com.hardtech.walletservice.exceptions.NotFoundException;
import com.hardtech.walletservice.repositories.CurrencyRepository;
import com.hardtech.walletservice.repositories.WalletRepository;
import com.hardtech.walletservice.repositories.WalletTransactionRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.util.*;
import java.util.stream.Stream;

@Service
@AllArgsConstructor
@Transactional
@Slf4j
public class WalletService {
    private final WalletRepository walletRepository;
    private final CurrencyRepository currencyRepository;
    private final WalletTransactionRepository walletTransactionRepository;

    @PostConstruct
    public void loadDate() {
        Random random = new Random();

        //currency
        Stream.of("USD", "EUR", "XOF", "XAF", "AUD", "JPY", "GBP", "CAD", "NZD",
                        "CHF", "CNY", "RUB", "SEK", "NOK", "KRW", "MXN", "ZAR")
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
        log.info("Enregistrement terminé");
    }

    public Wallet addWallet(WalletDTO walletDTO) {
        Currency currency =
                currencyRepository.findById(walletDTO.getCurrencyCode()).orElseThrow(() -> new NotFoundException(
                        String.format("Currency %s not found", walletDTO.getCurrencyCode())));
        Wallet wallet = Wallet.builder()
                .id(UUID.randomUUID().toString())
                .createAt(System.currentTimeMillis())
                .userId(UUID.randomUUID().toString())
                .currency(currency)
                .balance(walletDTO.getBalance())
                .build();

        log.info("Wallet ajouté");

        return walletRepository.save(wallet);
    }

    public List<Wallet> userWallets() {
        return walletRepository.findAll();
    }

    public Wallet walletById(String id) {
        return walletRepository.findById(id).orElseThrow(() -> new NotFoundException(String.format("Wallet" +
                " %s not" + " " + "found", id)));
    }

    public List<Wallet> transfer(TransferDTO transferDTO) {
        if (transferDTO.getSourceId() != transferDTO.getDestinationId()){
            //get source wallet with id
            Wallet source = walletRepository.findById(transferDTO.getSourceId()).orElseThrow(() -> new NotFoundException(
                    String.format("Wallet source %s not found", transferDTO.getSourceId())));
            //get destination wallet with id
            Wallet destination =
                    walletRepository.findById(transferDTO.getDestinationId()).orElseThrow(() -> new NotFoundException(
                            String.format("Wallet destination %s not found", transferDTO.getDestinationId())));

            //source transaction
            WalletTransaction sourceTransaction = WalletTransaction.builder()
                    .wallet(source)
                    .amount(transferDTO.getAmount())
                    .saleCurrencyPrice(source.getCurrency().getSalePrice())
                    .purchaseCurrencyPrice(source.getCurrency().getPurchasePrice())
                    .timestamp(System.currentTimeMillis())
                    .type(TransactionType.DEBIT)
                    .build();
            walletTransactionRepository.save(sourceTransaction);
            source.setBalance(source.getBalance() - transferDTO.getAmount());

            Double destinationAmount =
                    transferDTO.getAmount() * (destination.getCurrency().getSalePrice() / source.getCurrency().getPurchasePrice());

            //destination transaction
            WalletTransaction destinationTransaction = WalletTransaction.builder()
                    .wallet(destination)
                    .amount(destinationAmount)
                    .saleCurrencyPrice(destination.getCurrency().getSalePrice())
                    .purchaseCurrencyPrice(destination.getCurrency().getPurchasePrice())
                    .timestamp(System.currentTimeMillis())
                    .type(TransactionType.CREDIT)
                    .build();
            walletTransactionRepository.save(destinationTransaction);
            destination.setBalance(destination.getBalance() + destinationAmount);

            log.info("Transfert effectué");

            return Arrays.asList(source, destination);
        }else {
            throw new IllegalArgumentException("");
        }


    }

    public Boolean deleteWallet(String id) {
        Wallet wallet = walletRepository.findById(id).orElseThrow(null);
        if (Objects.nonNull(wallet)) {
            walletRepository.deleteById(id);
            log.warn("Wallet supprimé");
            return true;
        }
        return false;
    }

    public List<Currency> currencies() {
        return currencyRepository.findAll();
    }

}
