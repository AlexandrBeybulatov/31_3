package web.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import web.models.User;
import web.service.UserService;

import java.util.List;

@org.springframework.web.bind.annotation.RestController
@RequestMapping("/rest")
public class RestController {
        private final UserService userService;

        public RestController(UserService userService) {
                this.userService = userService;
        }

        @GetMapping("")
        public ResponseEntity<List<User>> list() {
                List<User> list = userService.allUsers();
                return (list !=null && !list.isEmpty()) ?
                        new ResponseEntity<>(list, HttpStatus.OK) :
                        new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        @GetMapping("/{id}")
        public ResponseEntity<User> getById(@PathVariable int id) {
                return (userService.getById(id) != null) ?
                        new ResponseEntity<>(userService.getById(id), HttpStatus.OK) :
                        new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        @PutMapping()
        public ResponseEntity<User> edit(@RequestBody User user) {
                userService.update(user);
                return ResponseEntity.ok().body(user);
        }

        @DeleteMapping("")
        public ResponseEntity<User> delete(@RequestBody User user) {
                userService.delete(user);
                return new ResponseEntity<>(HttpStatus.OK);
        }

        @PostMapping(value = "/add")
        public ResponseEntity<User> add(@RequestBody User user) {
                userService.add(user);
                return ResponseEntity.ok().body(user);
        }

        @GetMapping("/user")
        public ResponseEntity<User> userPage() {
                Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
                return (loggedInUser != null) ?
                        new ResponseEntity<>(userService.getByName(loggedInUser.getName()), HttpStatus.OK) :
                        new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
}
