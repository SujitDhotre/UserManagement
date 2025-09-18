package com.example.userManagement.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MessageTO {
    private String message;
    private boolean status;
    private Object data; // optional data (can be null)

}
