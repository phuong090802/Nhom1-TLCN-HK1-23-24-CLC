package com.ute.studentconsulting.repository;

import com.ute.studentconsulting.entity.Conversation;
import com.ute.studentconsulting.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ConversationRepository extends JpaRepository<Conversation, String> {
    List<Conversation> findAllByStaffIsOrUserIs(User staff, User user);

    Optional<Conversation> findByStaffIsAndUserIs(User staff, User user);

    @Query("SELECT c FROM Conversation c WHERE (c.user.id = :userId1 AND c.staff.id = :staffId1) " +
            "OR (c.staff.id = :staffId2 AND c.user.id = :userId2)")
    Conversation findByUserIdAndStaffIdOrStaffIdAndUserId
            (@Param("userId1") String userId1, @Param("staffId1") String staffId1, @Param("staffId2") String staffId2, @Param("userId2") String userId2);
}
