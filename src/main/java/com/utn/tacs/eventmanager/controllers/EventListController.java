package com.utn.tacs.eventmanager.controllers;

import com.utn.tacs.eventmanager.controllers.dto.EventDTO;
import com.utn.tacs.eventmanager.controllers.dto.EventListDTO;
import com.utn.tacs.eventmanager.controllers.dto.UserDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/events_lists")
public class EventListController {

    @PostMapping
    public ResponseEntity<Object> createEventList(@RequestBody EventListDTO eventList) {
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PatchMapping("/{eventListId}")
    public ResponseEntity<Object> addEvent(@PathVariable Integer eventListId, @RequestBody EventDTO event) {
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/{eventListId}")
    public ResponseEntity<Object> modifyEvent(@PathVariable Integer eventListId, @RequestBody EventListDTO eventList) {
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{eventListId}")
    public ResponseEntity<Object> deleteEventList(@PathVariable Integer eventListId) {
        return new ResponseEntity<>(HttpStatus.OK);
    }
}