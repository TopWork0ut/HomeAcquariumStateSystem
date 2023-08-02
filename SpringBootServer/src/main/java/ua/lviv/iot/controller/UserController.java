package ua.lviv.iot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ua.lviv.iot.entity.User;
import ua.lviv.iot.exception.UserNotFoundException;
import ua.lviv.iot.exception.UsernameAlreadyExists;
import ua.lviv.iot.service.UserService;

import java.util.List;

@CrossOrigin
//@CrossOrigin(origins = "http://192.168.31.123:3000")
@RestController
@RequestMapping("/user")
public class UserController {
    private UserService userService;
    @Autowired
    public UserController(UserService userService){
        this.userService = userService;
    }
    @GetMapping("/")
    public List<User> findAll(){
        return userService.findAll();
    }
    @GetMapping("/{id}")
    public User findById(@PathVariable("id")Long id) throws UserNotFoundException {
        return userService.findById(id);
    }

    @PostMapping("/")
    public User saveInfo(@RequestBody User info) throws UsernameAlreadyExists {
        return userService.saveInfo(info);
    }

    @PutMapping("/{id}")
    public User updateInfo(@PathVariable("id")Long id, @RequestBody User info) throws UserNotFoundException {
        return userService.update(id, info);
    }
    @DeleteMapping("/{id}")
    public User deleteById(@PathVariable("id")Long id) throws UserNotFoundException {
        return userService.deleteByid(id);
    }
}
