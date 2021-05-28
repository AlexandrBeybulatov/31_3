package web.service;

import web.models.Role;
import web.models.User;

import java.util.List;

public interface UserService {

    List<Role> getAllRoles();
    List<User> allUsers();
    void add(User user);
    void delete(User user);
    User getById(int id);
    User getByName(String name);;
    void update(User user);


}
