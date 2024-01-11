package com.ute.studentconsulting.service;

import com.ute.studentconsulting.entity.Conversation;
import com.ute.studentconsulting.entity.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


public interface MessageService {
    Message save(Message message);
    Page<Message> findAllByConversationOrderBySentAtDesc(Conversation conversation, Pageable pageable);
    Message findFirstByConversationOrderBySentAtDesc(Conversation conversation);
}
