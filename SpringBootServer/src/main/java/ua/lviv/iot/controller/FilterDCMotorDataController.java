package ua.lviv.iot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ua.lviv.iot.entity.FilterDCMotorData;
import ua.lviv.iot.exception.FilterDCMotorAlreadyExists;
import ua.lviv.iot.exception.FilterDCMotorDataNotFoundException;
import ua.lviv.iot.service.FilterDCMotorDataService;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/dc_motor/data")
public class FilterDCMotorDataController {
    private FilterDCMotorDataService filterDCMotorDataService;
    @Autowired
    public FilterDCMotorDataController(FilterDCMotorDataService filterDCMotorDataService) {
        this.filterDCMotorDataService = filterDCMotorDataService;
    }

    @PostMapping("/")
    public FilterDCMotorData saveInfoByStartFiltering(@RequestBody FilterDCMotorData info) throws FilterDCMotorAlreadyExists {
        return filterDCMotorDataService.saveFilterDCMotorDataInfoByStartTime(info);
    }

    @PutMapping("/endDate/")
    public FilterDCMotorData saveInfoByEndFiltering() throws FilterDCMotorDataNotFoundException {
        return filterDCMotorDataService.updateFilterDCMotorDataInfoByEndTime();
    }

    @GetMapping("/")
    public List<FilterDCMotorData> findAll(){
        return filterDCMotorDataService.findAll();
    }
    @GetMapping("/{id}")
    public FilterDCMotorData findById(@PathVariable("id")Long id) throws FilterDCMotorDataNotFoundException {
        return filterDCMotorDataService.findById(id);
    }

    @GetMapping("/connected/{id}")
    public List<FilterDCMotorData> findByDCMotorId(@PathVariable("id")Long DCid) {
        return filterDCMotorDataService.findAllByDCID(DCid);
    }

    @PutMapping("/{id}")
    public FilterDCMotorData updateInfo(@PathVariable("id")Long id, @RequestBody FilterDCMotorData info) throws FilterDCMotorDataNotFoundException {
        return filterDCMotorDataService.updateFilterDCMotorDataInfo(id, info);
    }

    @DeleteMapping("/{id}")
    public FilterDCMotorData deleteInfoById(@PathVariable("id")Long id) throws FilterDCMotorDataNotFoundException {
        return filterDCMotorDataService.deleteById(id);
    }
}
