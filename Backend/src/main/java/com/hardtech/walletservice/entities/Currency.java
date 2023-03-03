package com.hardtech.walletservice.entities;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@DynamicUpdate
@Entity
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Currency {
    @Id
    String code;
    String name;
    String symbol;
    Double salePrice;
    Double purchasePrice;

}
