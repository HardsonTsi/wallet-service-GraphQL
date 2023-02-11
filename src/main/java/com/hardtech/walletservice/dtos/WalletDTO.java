package com.hardtech.walletservice.dtos;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class WalletDTO {
    Double balance;
    String currencyCode;
}
