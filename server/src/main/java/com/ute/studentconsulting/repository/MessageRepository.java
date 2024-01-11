package com.ute.studentconsulting.repository;

import com.ute.studentconsulting.entity.Conversation;
import com.ute.studentconsulting.entity.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MessageRepository extends JpaRepository<Message, String> {
    Page<Message> findAllByConversationOrderBySentAtDesc(Conversation conversation, Pageable pageable);
    Optional<Message> findFirstByConversationOrderBySentAtDesc(Conversation conversation);
}
