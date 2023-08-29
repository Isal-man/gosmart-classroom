package com.gosmart.classroom.attachments;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AttachmentRepository extends JpaRepository<Attachments, Integer> {

    List<Attachments> findAllByAssignmentsId(String aid);

}
