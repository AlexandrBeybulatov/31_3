package web.dao;

import web.models.User;

import java.util.List;

public interface UserDao {

    List<User> allUsers();
    void add(User user);
    void delete(User user);
    void update(User user);
    User getById(int id);
    User getByName(String name);

}
