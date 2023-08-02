package ua.lviv.iot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ua.lviv.iot.entity.FilterDCMotor;
import ua.lviv.iot.exception.FilterDCMotorNotFoundException;
import ua.lviv.iot.service.FilterDCMotorService;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/dc_motor")
public class FilterDCMotorController {
    private FilterDCMotorService filterDCMotorService;
    @Autowired
    public FilterDCMotorController(FilterDCMotorService filterDCMotorService) {
        this.filterDCMotorService = filterDCMotorService;
    }

    @PostMapping("/")
    public FilterDCMotor saveInfo(@RequestBody FilterDCMotor info){
        return filterDCMotorService.saveFilterDCMotorInfo(info);
    }

    @GetMapping("/")
    public List<FilterDCMotor> findAll(){
        return filterDCMotorService.findAll();
    }
    @GetMapping("/{id}")
    public FilterDCMotor findById(@PathVariable("id")Long id) throws FilterDCMotorNotFoundException {
        return filterDCMotorService.findById(id);
    }
    @PutMapping("/{id}")
    public FilterDCMotor updateInfo(@PathVariable("id")Long id, @RequestBody FilterDCMotor info) throws FilterDCMotorNotFoundException {
        return filterDCMotorService.updateFilterDCMotorInfo(id, info);
    }

    @DeleteMapping("/{id}")
    public FilterDCMotor deleteInfoById(@PathVariable("id")Long id) throws FilterDCMotorNotFoundException {
        return filterDCMotorService.deleteById(id);
    }
}
