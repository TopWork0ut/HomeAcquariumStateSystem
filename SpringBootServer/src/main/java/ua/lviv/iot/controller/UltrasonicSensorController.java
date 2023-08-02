package ua.lviv.iot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ua.lviv.iot.entity.UltrasonicSensor;
import ua.lviv.iot.exception.UltrasonicNotFoundException;
import ua.lviv.iot.service.UltrasonicSensorService;

import java.util.List;


@CrossOrigin
@RestController
@RequestMapping("/ultrasonic")
public class UltrasonicSensorController {
    private UltrasonicSensorService ultrasonicSensorService;
    @Autowired
    public UltrasonicSensorController(UltrasonicSensorService ultrasonicSensorService){
        this.ultrasonicSensorService = ultrasonicSensorService;
    }
    @GetMapping("/")
    public List<UltrasonicSensor> findAll(){
        return ultrasonicSensorService.findAll();
    }

    @GetMapping("/{id}")
    public UltrasonicSensor findById(@PathVariable("id")Long id) throws UltrasonicNotFoundException {
        return ultrasonicSensorService.findById(id);
    }

    @PostMapping("/")
    public UltrasonicSensor saveInfo(@RequestBody UltrasonicSensor info){
        return ultrasonicSensorService.saveInfo(info);
    }
//    @PostMapping("/distance")
//    public UltrasonicSensor saveInfo(@RequestParam ("distance")String distance){
//        return ultrasonicSensorService.saveInfoByParams(distance);
//    }

    @PutMapping("/{id}")
    public UltrasonicSensor updateInfo(@PathVariable("id")Long id, @RequestBody UltrasonicSensor info) throws UltrasonicNotFoundException {
        return ultrasonicSensorService.update(id, info);
    }
    @DeleteMapping("/{id}")
    public UltrasonicSensor deleteById(@PathVariable("id")Long id) throws UltrasonicNotFoundException {
        return ultrasonicSensorService.deleteById(id);
    }
}
