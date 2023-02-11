package com.hardtech.walletservice.web;


import com.hardtech.walletservice.dtos.TransferDTO;
import com.hardtech.walletservice.dtos.WalletDTO;
import com.hardtech.walletservice.entities.Currency;
import com.hardtech.walletservice.entities.Wallet;
import com.hardtech.walletservice.services.WalletService;
import lombok.AllArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
@AllArgsConstructor
public class WalletGraphQLController {
    private final WalletService walletService;

    @MutationMapping
    public Wallet addWallet(@Argument WalletDTO wallet) {
        return walletService.addWallet(wallet);
    }

    @MutationMapping
    public List<Wallet> transfer(@Argument TransferDTO transfer) {
        return walletService.transfer(transfer);
    }

    @QueryMapping
    public Wallet walletById(@Argument String id) {
        return walletService.walletById(id);
    }

    @QueryMapping
    public List<Wallet> userWallets() {
        return walletService.userWallets();
    }

    @QueryMapping
    public List<Currency> currencies() {
        return walletService.currencies();
    }

}
