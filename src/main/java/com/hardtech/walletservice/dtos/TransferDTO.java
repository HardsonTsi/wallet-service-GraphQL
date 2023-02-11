package com.hardtech.walletservice.dtos;

import com.hardtech.walletservice.entities.TransactionType;
import lombok.*;
import lombok.experimental.FieldDefaults;

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
