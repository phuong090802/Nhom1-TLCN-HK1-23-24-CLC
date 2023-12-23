package com.ute.studentconsulting.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class QuestionDetailsModel {

    private String title;
    private String content;
    private int status;
    private String date;
    private int views;
    private UserDetailsModel user;
    private String departmentName;
    private AnswerDetailsModel answer;

}
