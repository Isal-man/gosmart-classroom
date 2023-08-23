package com.gosmart.classroom.teachers;

import com.gosmart.classroom.users.Users;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Entity
@Getter
@Setter
public class Teachers {

    @Id
    private String id;

    @OneToOne
    private Users users;

}
