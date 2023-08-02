package ua.lviv.iot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.lviv.iot.entity.User;
import ua.lviv.iot.exception.UserNotFoundException;
import ua.lviv.iot.exception.UsernameAlreadyExists;
import ua.lviv.iot.repository.UserRepository;

import java.util.List;

@Service
public class UserService {
    private UserRepository userRepository;
    @Autowired
    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public User saveInfo(User info) throws UsernameAlreadyExists {
        boolean noneMatch = findAll().stream().noneMatch(user -> user.getUsername().equals(info.getUsername()));
        if (noneMatch) {
            return userRepository.save(info);
        } else {
            throw new UsernameAlreadyExists("This username is already taken! Choose another");
        }
    }

    public User findById(Long id) throws UserNotFoundException {
        return userRepository.findById(id).orElseThrow(()->new UserNotFoundException("User with id "+id+" was not found!"));
    }
    public User update(Long id, User info) throws UserNotFoundException {
        User user = findById(id);
        user.setId(id);
        user.setUsername(info.getUsername());
        user.setPassword(info.getPassword());
        return userRepository.save(user);
    }

    public User deleteByid(Long id) throws UserNotFoundException {
        User user = findById(id);
        userRepository.deleteById(id);
        return user;
    }


    public List<User> findAll() {
        return userRepository.findAll();
    }

}
