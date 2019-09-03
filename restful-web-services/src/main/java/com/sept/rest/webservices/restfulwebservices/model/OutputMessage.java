package com.sept.rest.webservices.restfulwebservices.model;

public class OutputMessage {
    private String from;
    private String message;
    private String time;
    private boolean myMsg;

    public OutputMessage(String from, String message, String time, boolean myMsg) {
        this.from = from;
        this.message = message;
        this.time = time;
        this.myMsg = myMsg;
    }

    public OutputMessage() {
    }

    public String getFrom() {
        return from;
    }

    public String getMessage() {
        return message;
    }

    public String getTime() {
        return time;
    }

    public boolean isMyMsg() {
        return myMsg;
    }
}
