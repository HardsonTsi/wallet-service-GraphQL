package com.hardtech.walletservice.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_ACCEPTABLE)
public class BalanceInsufficientException extends RuntimeException {
    public BalanceInsufficientException(String walletId) {
        super(String.format("Wallet %d balance insufficient", walletId));
    }
}
