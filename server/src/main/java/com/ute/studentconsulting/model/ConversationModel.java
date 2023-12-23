package com.ute.studentconsulting.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ConversationModel {
    private String id;
    private String userId;
    private String name;
    private String avatar;
    private boolean deletedByStaff;
    private boolean deletedByUser;
    private MessageModel latestMsg;
}
