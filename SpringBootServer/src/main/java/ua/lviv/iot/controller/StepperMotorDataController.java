package ua.lviv.iot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import ua.lviv.iot.entity.FilterDCMotorData;
import ua.lviv.iot.entity.StepperMotorData;
import ua.lviv.iot.exception.StepperMotorAlreadyExists;
import ua.lviv.iot.exception.StepperMotorDataNotFoundException;

import ua.lviv.iot.service.StepperMotorDataService;


import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/stepper_motor/data")
public class StepperMotorDataController {
    private StepperMotorDataService stepperMotorDataService;
    @Autowired
    public StepperMotorDataController(StepperMotorDataService stepperMotorDataService) {
        this.stepperMotorDataService = stepperMotorDataService;
    }

    @PostMapping("/")
    public StepperMotorData saveInfo(@RequestBody StepperMotorData info) throws StepperMotorAlreadyExists {
        return stepperMotorDataService.saveStepperMotorDataInfo(info);
    }

    @GetMapping("/connected/{id}")
    public List<StepperMotorData> findByStepperMotorId(@PathVariable("id")Long DCid) {
        return stepperMotorDataService.findAllByStepperID(DCid);
    }

    @GetMapping("/")
    public List<StepperMotorData> findAll(){
        return stepperMotorDataService.findAll();
    }
    @GetMapping("/{id}")
    public StepperMotorData findById(@PathVariable("id")Long id) throws StepperMotorDataNotFoundException {
        return stepperMotorDataService.findById(id);
    }
    @PutMapping("/{id}")
    public StepperMotorData updateInfo(@PathVariable("id")Long id, @RequestBody StepperMotorData info) throws StepperMotorDataNotFoundException {
        return stepperMotorDataService.updateStepperMotorDataInfo(id, info);
    }

    @DeleteMapping("/{id}")
    public StepperMotorData deleteInfoById(@PathVariable("id")Long id) throws StepperMotorDataNotFoundException {
        return stepperMotorDataService.deleteById(id);
    }
}
