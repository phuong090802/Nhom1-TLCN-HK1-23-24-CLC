package com.ute.studentconsulting.model;

import lombok.*;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PaginationModel<T> {
    private List<T> data;
    private int page;
    private int pages;
}
