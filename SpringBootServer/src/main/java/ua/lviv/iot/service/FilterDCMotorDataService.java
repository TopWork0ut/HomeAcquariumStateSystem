package ua.lviv.iot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.lviv.iot.entity.FilterDCMotorData;
import ua.lviv.iot.exception.FilterDCMotorAlreadyExists;
import ua.lviv.iot.exception.FilterDCMotorDataNotFoundException;
import ua.lviv.iot.exception.StepperMotorAlreadyExists;
import ua.lviv.iot.repository.FilterDCMotorDataRepository;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Service
public class FilterDCMotorDataService {
    private FilterDCMotorDataRepository filterDCMotorDataRepository;
    @Autowired
    public FilterDCMotorDataService(FilterDCMotorDataRepository filterDCMotorDataRepository){
        this.filterDCMotorDataRepository = filterDCMotorDataRepository;
    }

    public FilterDCMotorData saveFilterDCMotorDataInfoByStartTime(FilterDCMotorData info) throws FilterDCMotorAlreadyExists {
//        boolean noneMatch = findAll().stream().noneMatch(dcMotorData -> dcMotorData.getDcMotorId().equals(info.getDcMotorId()));
//        if (noneMatch) {
            info.setStartTimeOfFiltering(LocalDateTime.parse(LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS).format(DateTimeFormatter.ISO_LOCAL_DATE_TIME)));
            return filterDCMotorDataRepository.save(info);
//        } else {
//            throw new FilterDCMotorAlreadyExists("This filter dc motor already exists! Choose another");
//        }

    }

//    public FilterDCMotorData updateFilterDCMotorDataInfoByEndTime(Long id, FilterDCMotorData info) throws FilterDCMotorDataNotFoundException {
//        FilterDCMotorData filterDCMotorData = findById(id);
//        filterDCMotorData.setEndTimeOfFiltering(LocalDateTime.parse(LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS).format(DateTimeFormatter.ISO_LOCAL_DATE_TIME)));
//        return filterDCMotorDataRepository.save(info);
//    }

    public FilterDCMotorData updateFilterDCMotorDataInfoByEndTime() throws FilterDCMotorDataNotFoundException {
        int countOfDataRows = filterDCMotorDataRepository.findAll().size() - 1;
        FilterDCMotorData filterDCMotorData = filterDCMotorDataRepository.findAll().get(countOfDataRows);
        filterDCMotorData.setEndTimeOfFiltering(LocalDateTime.parse(LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS).format(DateTimeFormatter.ISO_LOCAL_DATE_TIME)));
        return filterDCMotorDataRepository.save(filterDCMotorData);
    }



    public List<FilterDCMotorData> findAll(){
        return filterDCMotorDataRepository.findAll();
    }
    public List<FilterDCMotorData> findAllByDCID(Long DCID){
        List<FilterDCMotorData> allData = filterDCMotorDataRepository.findAll();
        List<FilterDCMotorData> filteredData = new ArrayList<>();
        for (FilterDCMotorData data : allData) {
            if (data.getDcMotorId().equals(DCID)) {
                filteredData.add(data);
            }
        }
        return filteredData;
    }

    public FilterDCMotorData findById(Long id) throws FilterDCMotorDataNotFoundException {
        return filterDCMotorDataRepository.findById(id).orElseThrow(()->new FilterDCMotorDataNotFoundException("Filter dc motor data with id "+id+" was not found!"));
    }



    public FilterDCMotorData updateFilterDCMotorDataInfo(Long id, FilterDCMotorData info) throws FilterDCMotorDataNotFoundException {
        FilterDCMotorData filterDCMotorData = findById(id);
        filterDCMotorData.setId(id);
        filterDCMotorData.setStartTimeOfFiltering(info.getStartTimeOfFiltering());
        filterDCMotorData.setEndTimeOfFiltering(info.getEndTimeOfFiltering());
        return filterDCMotorDataRepository.save(filterDCMotorData);
    }

    public FilterDCMotorData deleteById(Long id) throws FilterDCMotorDataNotFoundException {
        FilterDCMotorData filterDCMotorData = findById(id);
        if(filterDCMotorData !=null){
            filterDCMotorDataRepository.deleteById(id);
        }
        return filterDCMotorData;
    }
}
