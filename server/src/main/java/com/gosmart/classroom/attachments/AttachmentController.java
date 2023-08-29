package com.gosmart.classroom.attachments;

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
     * @detail Get all attachment by Assignment ID
     * @method GET /api/v1/attachments/assignment?aid={}
     * @access private
     */
    @GetMapping("/assignment")
    public List<Attachments> findAllByAssignment(@RequestParam("aid") String aid) {
        return attachmentService.findAllByAssignment(aid);
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
