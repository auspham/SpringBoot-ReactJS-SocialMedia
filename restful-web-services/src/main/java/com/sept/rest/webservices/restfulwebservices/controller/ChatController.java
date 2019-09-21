package com.sept.rest.webservices.restfulwebservices.controller;

import com.sept.rest.webservices.restfulwebservices.model.ChatMessage;
import com.sept.rest.webservices.restfulwebservices.model.OutputMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;

import java.lang.reflect.Array;
import java.security.Principal;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;

@Controller
public class ChatController {
    protected static ArrayList<String> userList = new ArrayList<String>();

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/queue/specific-user")
    public String sendSpecific(@Payload ChatMessage msg) throws Exception {
            String time = LocalDateTime.now().toString();
            OutputMessage out = new OutputMessage(msg.getSender(), msg.getContent(), time, false);
            System.out.println("receiver " + msg.getReceiver());
            simpMessagingTemplate.convertAndSendToUser(msg.getReceiver(), "/app/user/queue/specific-user", out);
            return "Received";
    }

    public void addUser(String user) {
        userList.add(user);
    }

    public ArrayList<String> getUserList() {
        return userList;
    }

    public static void removeUser(String user) {
        userList.remove(user);
    }
    @MessageMapping("/getUserlist")  // For send, append app/
    @SendTo("/topic/getUser") // For Subscribe
    public Object[] getUser(@Payload String username) {
        if(!userList.contains(username)) {
            userList.add(username);
        }
        return userList.toArray();
    }

    @MessageMapping("/sendMessage")
    @SendTo("/topic/public")
    public ChatMessage sendMessage(@Payload ChatMessage chatMessage) {
        System.out.println("receiver " + chatMessage.getReceiver());
        return chatMessage;
    }

    @MessageMapping("/addUser")
    @SendTo("/topic/public")
    public ChatMessage addUser(@Payload ChatMessage chatMessage,
                               SimpMessageHeaderAccessor headerAccessor) {
        // Add user in web socket session
        headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());
        System.out.println(headerAccessor.getSubscriptionId());
        return chatMessage;
    }

    @MessageMapping("/postStatus")
    @SendTo("/topic/status")
    public boolean check(@Payload boolean status) {
        System.out.println("Received status post");
        return true;
    }
    
}


