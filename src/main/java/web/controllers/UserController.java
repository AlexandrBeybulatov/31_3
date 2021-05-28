package web.controllers;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import web.service.UserService;

@Controller
@RequestMapping("/")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/admin")
    public ModelAndView admin() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("admin");

//        getting current user
        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String username = loggedInUser.getName();
        modelAndView.addObject("loggedInUserName", username);

//        For all roles list
        modelAndView.addObject("AllRolesList", userService.getAllRoles());

//        for current users roles
        modelAndView.addObject("userRoles", userService.getByName(username).getRoles());
        return modelAndView;
    }

    @GetMapping("/user")
    public ModelAndView user() {
        ModelAndView modelAndView = new ModelAndView();

        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String username = loggedInUser.getName();
        modelAndView.addObject("user", userService.getByName(username));

        modelAndView.setViewName("user'sPage");
        return modelAndView;
    }

}