package ua.lviv.iot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ua.lviv.iot.entity.FilterDCMotor;
import ua.lviv.iot.entity.StepperMotor;
import ua.lviv.iot.exception.FilterDCMotorNotFoundException;
import ua.lviv.iot.exception.StepperMotorNotFoundException;
import ua.lviv.iot.service.StepperMotorService;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/stepper_motor")
public class StepperMotorController {
    private StepperMotorService stepperMotorService;
    @Autowired
    public StepperMotorController(StepperMotorService stepperMotorService) {
        this.stepperMotorService = stepperMotorService;
    }

    @PostMapping("/")
    public StepperMotor saveInfo(@RequestBody StepperMotor info){
        return stepperMotorService.saveStepperMotorInfo(info);
    }
    @GetMapping("/")
    public List<StepperMotor> findAll(){
        return stepperMotorService.findAll();
    }
    @GetMapping("/{id}")
    public StepperMotor findById(@PathVariable("id")Long id) throws StepperMotorNotFoundException {
        return stepperMotorService.findById(id);
    }
    @PutMapping("/{id}")
    public StepperMotor updateInfo(@PathVariable("id")Long id, @RequestBody StepperMotor info) throws StepperMotorNotFoundException {
        return stepperMotorService.updateStepperMotorInfo(id, info);
    }



    @DeleteMapping("/{id}")
    public StepperMotor deleteInfoById(@PathVariable("id")Long id) throws StepperMotorNotFoundException {
        return stepperMotorService.deleteById(id);
    }
}
