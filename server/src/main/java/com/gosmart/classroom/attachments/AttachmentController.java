package com.gosmart.classroom.attachments;

import com.gosmart.classroom.users.UserService;
import com.gosmart.classroom.users.Users;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/attachments")
public class AttachmentController {

    private final AttachmentService attachmentService;
    private final UserService userService;

    /*
    * @detail Get all attachment
    * @method GET /api/v1/attachments
    * @access private
    */
    @GetMapping
    public List<Attachments> findAll() {
        return attachmentService.findAll();
    }

    /*
     * @detail Get all attachment by Assignment ID and status user
     * @method GET /api/v1/attachments/as/{aid}/{status}
     * @access private
     */
    @GetMapping("/as/{aid}/{status}")
    public List<Attachments> findAllByAssignmentAndStatus(@PathVariable("aid") String aid,
                                                           @PathVariable("status") String status) {

        return attachmentService.findAllByAssignmentAndStatus(aid, status);
    }

    /*
     * @detail Get all attachment by Assignment ID and User Email
     * @method GET /api/v1/attachments/au/{aid}/{email}
     * @access private
     */
    @GetMapping("/au/{aid}/{email}")
    public List<Attachments> findAllByAssignmentAndUser(@PathVariable("aid") String aid,
                                                           @PathVariable("email") String email) {

        Users users = userService.findByEmail(email);

        return attachmentService.findAllByAssignmentAndUser(aid, users.getEmail());
    }

    /*
     * @detail Get attachment by ID
     * @method GET /api/v1/attachments/{id}
     * @access private
     */
    @GetMapping("/{id}")
    public Attachments findById(@PathVariable("id") Integer id) {
        return attachmentService.findById(id);
    }

    /*
     * @detail Upload attachment
     * @method POST /api/v1/attachments?user={}&assignment={}&status={}
     * @access private
     */
    @PostMapping
    public ResponseEntity<?> upload(@RequestBody AttachmentRequest request, @RequestParam("user") String email,
                                    @RequestParam("assignment") String aid, @RequestParam("status") String status) throws IOException {
        return ResponseEntity.ok(attachmentService.upload(request, email, aid, status));
    }

}
