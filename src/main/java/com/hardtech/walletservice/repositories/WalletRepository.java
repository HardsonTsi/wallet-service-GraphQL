package com.hardtech.walletservice.repositories;

import com.hardtech.walletservice.entities.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WalletRepository extends JpaRepository<Wallet, String> {
}