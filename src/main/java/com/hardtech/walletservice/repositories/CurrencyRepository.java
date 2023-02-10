package com.hardtech.walletservice.repositories;

import com.hardtech.walletservice.entities.Currency;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CurrencyRepository extends JpaRepository<Currency, String> {
}