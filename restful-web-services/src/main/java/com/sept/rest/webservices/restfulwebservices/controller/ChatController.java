package com.sept.rest.webservices.restfulwebservices.controller;

import com.sept.rest.webservices.restfulwebservices.model.ChatMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

import java.util.ArrayList;
import java.util.Arrays;

@Controller
public class ChatController {
    protected static ArrayList<String> userList = new ArrayList<String>();

    public void addUser(String user) {
        userList.add(user);
    }

    public ArrayList<String> getUserList() {
        return userList;
    }

    public static void removeUser(String user) {
        userList.remove(user);
    }
    @MessageMapping("/getUserlist")
    @SendTo("/topic/getUser")
    public String getUser() {
        return Arrays.toString(userList.toArray());
    }

    @MessageMapping("/sendMessage")
    @SendTo("/topic/public")
    public ChatMessage sendMessage(@Payload ChatMessage chatMessage) {
        System.out.println("+ Receving message from client");
        return chatMessage;
    }

    @MessageMapping("/addUser")
    @SendTo("/topic/public")
    public ChatMessage addUser(@Payload ChatMessage chatMessage,
                               SimpMessageHeaderAccessor headerAccessor) {
        // Add user in web socket session
        headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());
        addUser(chatMessage.getSender());
        System.out.println(Arrays.toString(userList.toArray()));
        return chatMessage;
    }

}


