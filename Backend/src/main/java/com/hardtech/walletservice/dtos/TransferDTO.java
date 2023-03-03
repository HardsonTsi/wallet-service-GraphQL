package com.hardtech.walletservice.dtos;

import lombok.*;
import lombok.experimental.FieldDefaults;
import com.hardtech.walletservice.entities.TransactionType;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TransferDTO {
    String sourceId;
    String destinationId;
    TransactionType type;
    Double amount;
}
