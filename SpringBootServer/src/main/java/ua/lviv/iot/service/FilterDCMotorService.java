package ua.lviv.iot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.lviv.iot.entity.FilterDCMotor;
import ua.lviv.iot.entity.FilterDCMotorData;
import ua.lviv.iot.exception.FilterDCMotorDataNotFoundException;
import ua.lviv.iot.exception.FilterDCMotorNotFoundException;
import ua.lviv.iot.repository.FilterDCMotorDataRepository;
import ua.lviv.iot.repository.FilterDCMotorRepository;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class FilterDCMotorService {
    private FilterDCMotorRepository filterDCMotorRepository;
    @Autowired
    public FilterDCMotorService(FilterDCMotorRepository filterDCMotorRepository){
        this.filterDCMotorRepository = filterDCMotorRepository;
    }

    public FilterDCMotor saveFilterDCMotorInfo(FilterDCMotor info){
        return filterDCMotorRepository.save(info);
    }

//    public FilterDCMotor updateFilterDCMotorInfoByEndTime(Long id, FilterDCMotor info) throws FilterDCMotorNotFoundException {
//        FilterDCMotor filterDCMotor = findById(id);
//        filterDCMotor.setUserId(info.getUserId());
//        return filterDCMotorRepository.save(info);
//    }
    public List<FilterDCMotor> findAll(){
        return filterDCMotorRepository.findAll();
    }
    public FilterDCMotor findById(Long id) throws FilterDCMotorNotFoundException {
        return filterDCMotorRepository.findById(id).orElseThrow(()->new FilterDCMotorNotFoundException("Filter dc motor with id "+id+" was not found!"));
    }

    public FilterDCMotor updateFilterDCMotorInfo(Long id, FilterDCMotor info) throws FilterDCMotorNotFoundException {
        FilterDCMotor filterDCMotor = findById(id);
        filterDCMotor.setUserId(info.getUserId());
        return filterDCMotorRepository.save(filterDCMotor);
    }

//    public FilterDCMotorData updateFilterDCMotorInfo(Long id, FilterDCMotorData info) throws FilterDCMotorDataNotFoundException {
//        FilterDCMotorData filterDCMotorData = findById(id);
//        filterDCMotorData.setId(id);
//        filterDCMotorData.setStartTimeOfFiltering(info.getStartTimeOfFiltering());
//        filterDCMotorData.setEndTimeOfFiltering(info.getEndTimeOfFiltering());
//        return filterDCMotorDataRepository.save(filterDCMotorData);
//    }

    public FilterDCMotor deleteById(Long id) throws FilterDCMotorNotFoundException {
        FilterDCMotor filterDCMotor = findById(id);
        if(filterDCMotor !=null){
            filterDCMotorRepository.deleteById(id);
        }
        return filterDCMotor;
    }
}
