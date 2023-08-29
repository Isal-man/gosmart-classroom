package com.gosmart.classroom.users;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends JpaRepository<Users, String> {

    boolean existsByEmail(String email);

    boolean existsByFullName(String name);

}
