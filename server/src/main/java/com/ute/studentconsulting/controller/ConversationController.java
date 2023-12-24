package com.ute.studentconsulting.controller;

import com.ute.studentconsulting.entity.Conversation;
import com.ute.studentconsulting.entity.RoleName;
import com.ute.studentconsulting.entity.User;
import com.ute.studentconsulting.model.ConversationModel;
import com.ute.studentconsulting.model.MessageModel;
import com.ute.studentconsulting.payload.response.ApiSuccessResponse;
import com.ute.studentconsulting.payload.response.SuccessResponse;
import com.ute.studentconsulting.service.ConversationService;
import com.ute.studentconsulting.service.MessageService;
import com.ute.studentconsulting.service.UserService;
import com.ute.studentconsulting.util.AuthUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Objects;
import java.util.stream.Stream;

@RestController
@RequestMapping("/api/conversations")
@RequiredArgsConstructor
@Slf4j
public class ConversationController {
    private final ConversationService conversationService;
    private final UserService userService;
    private final AuthUtils authUtils;
    private final MessageService messageService;

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteConversation(@PathVariable("id") String id) {
        return handleDeleteConversation(id);
    }

    private ResponseEntity<?> handleDeleteConversation(String id) {
        var user = authUtils.getCurrentUser();
        var conversation = conversationService.findById(id);

        if (user.getRole().getName().equals(RoleName.ROLE_USER)) {
            conversation.setDeletedByUser(true);
        } else {
            conversation.setDeletedByStaff(true);
        }

        if (conversation.getDeletedByStaff() && conversation.getDeletedByUser()) {
            conversationService.deleteById(id);
        } else {
            conversationService.save(conversation);
        }

        return ResponseEntity.ok(new SuccessResponse("Xóa cuộc trò chuyện thành công"));
    }

    @GetMapping
    public ResponseEntity<?> getAllConversations(
            @RequestParam(defaultValue = "all", name = "name") String name) {
        return handleGetAllConversations(name);
    }

    private ResponseEntity<?> handleGetAllConversations(String name) {
        var user1 = authUtils.getCurrentUser();
        var listConversation = conversationService.findAllByUser(user1);
        var ids = listConversation.stream()
                .flatMap(conversation -> Stream.of(conversation.getStaff().getId(), conversation.getUser().getId()))
                .filter(id -> !id.equals(user1.getId()))
                .distinct().toList();
        var userConversations = name.equals("all") ? userService.findAllByIdIn(ids) :
                userService.findAllByIdInAndNameContainingIgnoreCase(ids, name);
        var simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        var response = userConversations.stream()
                .map(userItem -> {
                    var conversation = findConversationByUser1AndUser2(user1, userItem);
                    var message = messageService.findFirstByConversationOrderBySentAtDesc(conversation);
                    if (conversation != null && message != null) {
                        return new ConversationModel(conversation.getId(), userItem.getId(), userItem.getName(), user1.getAvatar(),
                                conversation.getDeletedByStaff(), conversation.getDeletedByUser(), new MessageModel(message.getId(), message.getMessageText(),
                                simpleDateFormat.format(message.getSentAt()), message.getSeen(), message.getSender().getId()));
                    }
                    return null;
                })
                .filter(Objects::nonNull)
                .toList();
        return ResponseEntity.ok(new ApiSuccessResponse<>(response));
    }

    private Conversation findConversationByUser1AndUser2(User user1, User user2) {
        if (user1.getRole().getName().equals(RoleName.ROLE_USER)) {
            return conversationService.findByStaffIsAndUserIs(user2, user1);
        }
        return conversationService.findByStaffIsAndUserIs(user1, user2);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getAllMessage(@PathVariable("id") String id) {
        return handleGetAllMessage(id);
    }

    private ResponseEntity<?> handleGetAllMessage(String id) {
        var conversation = conversationService.findById(id);
        var simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        var messages = messageService.findAllByConversationOrderBySentAtAsc(conversation).stream().map(message ->
                new MessageModel(message.getId(), message.getMessageText(),
                        simpleDateFormat.format(message.getSentAt()),
                        true, message.getSender().getId())).toList();
        return ResponseEntity.ok(new ApiSuccessResponse<>(messages));
    }
}
