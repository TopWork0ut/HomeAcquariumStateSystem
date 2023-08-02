package ua.lviv.iot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ua.lviv.iot.entity.StepperMotorData;
import ua.lviv.iot.entity.UltrasonicSensor;
import ua.lviv.iot.entity.UltrasonicSensorData;
import ua.lviv.iot.exception.UltrasonicNotFoundException;
import ua.lviv.iot.exception.UltrasonicSensorAlreadyExists;
import ua.lviv.iot.exception.UltrasonicSensorDataNotFoundException;
import ua.lviv.iot.service.UltrasonicSensorDataService;
import ua.lviv.iot.service.UltrasonicSensorService;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/ultrasonic/data")
public class UltrasonicSensorDataController {
    private UltrasonicSensorDataService ultrasonicSensorDataService;
    @Autowired
    public UltrasonicSensorDataController(UltrasonicSensorDataService ultrasonicSensorDataService){
        this.ultrasonicSensorDataService = ultrasonicSensorDataService;
    }
    @GetMapping("/")
    public List<UltrasonicSensorData> findAll(){
        return ultrasonicSensorDataService.findAll();
    }

    @GetMapping("/{id}")
    public UltrasonicSensorData findById(@PathVariable("id")Long id) throws UltrasonicSensorDataNotFoundException {
        return ultrasonicSensorDataService.findById(id);
    }

    @GetMapping("/connected/{id}")
    public List<UltrasonicSensorData> findByStepperMotorId(@PathVariable("id")Long Ultrasonicid) {
        return ultrasonicSensorDataService.findAllByUltrasonicID(Ultrasonicid);
    }

    @PostMapping("/")
    public UltrasonicSensorData saveInfo(@RequestBody UltrasonicSensorData info) throws UltrasonicSensorAlreadyExists {
        return ultrasonicSensorDataService.saveInfo(info);
    }
//    @PostMapping("/distance")
//    public UltrasonicSensor saveInfo(@RequestParam ("distance")String distance){
//        return ultrasonicSensorService.saveInfoByParams(distance);
//    }

    @PutMapping("/{id}")
    public UltrasonicSensorData updateInfo(@PathVariable("id")Long id, @RequestBody UltrasonicSensorData info) throws UltrasonicSensorDataNotFoundException, UltrasonicSensorAlreadyExists {
        return ultrasonicSensorDataService.update(id, info);
    }
    @DeleteMapping("/{id}")
    public UltrasonicSensorData deleteById(@PathVariable("id")Long id) throws UltrasonicSensorDataNotFoundException {
        return ultrasonicSensorDataService.deleteById(id);
    }
}
