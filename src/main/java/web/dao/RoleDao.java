package web.dao;

import web.models.Role;

import java.util.List;
import java.util.Set;

public interface RoleDao  {

    Role getOne(Long aLong);
    void add(Role role);
    void deleteRole(Role role);
    public void deleteRoles(Set<Role> roles);
    void update(Role role);
    Role getById(int id);
    Role getByName(String name);

    List<Role> getAllRoles();
}
