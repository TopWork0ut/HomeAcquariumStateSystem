package ua.lviv.iot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import ua.lviv.iot.entity.FilterDCMotorData;
import ua.lviv.iot.entity.StepperMotorData;
import ua.lviv.iot.exception.StepperMotorAlreadyExists;
import ua.lviv.iot.exception.StepperMotorDataNotFoundException;
import ua.lviv.iot.exception.UltrasonicSensorAlreadyExists;
import ua.lviv.iot.repository.StepperMotorDataRepository;


import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Service
public class StepperMotorDataService {
    private StepperMotorDataRepository stepperMotorDataRepository;
    @Autowired
    public StepperMotorDataService(StepperMotorDataRepository stepperMotorDataRepository){
        this.stepperMotorDataRepository = stepperMotorDataRepository;
    }

    public StepperMotorData saveStepperMotorDataInfo(StepperMotorData info) throws StepperMotorAlreadyExists {
//        boolean noneMatch = findAll().stream().noneMatch(stepperMotorData -> stepperMotorData.getMotorId().equals(info.getMotorId()));
//        if (noneMatch) {
            info.setTimeOfFeeding(LocalDateTime.parse(LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS).format(DateTimeFormatter.ISO_LOCAL_DATE_TIME)));
            return stepperMotorDataRepository.save(info);
//        } else {
//            throw new StepperMotorAlreadyExists("This stepper motor already exists! Choose another");
//        }

    }

    public List<StepperMotorData> findAllByStepperID(Long Stepperid){
        List<StepperMotorData> allData = stepperMotorDataRepository.findAll();
        List<StepperMotorData> filteredData = new ArrayList<>();
        for (StepperMotorData data : allData) {
            if (data.getMotorId().equals(Stepperid)) {
                filteredData.add(data);
            }
        }
        return filteredData;
    }



    public List<StepperMotorData> findAll(){
        return stepperMotorDataRepository.findAll();
    }
    public StepperMotorData findById(Long id) throws StepperMotorDataNotFoundException {
        return stepperMotorDataRepository.findById(id).orElseThrow(()->new StepperMotorDataNotFoundException("Stepper motor data with id "+id+" was not found!"));
    }

    public StepperMotorData updateStepperMotorDataInfo(Long id, StepperMotorData info) throws StepperMotorDataNotFoundException {
        StepperMotorData stepperMotorData = findById(id);
        stepperMotorData.setId(id);
        stepperMotorData.setTimeOfFeeding(info.getTimeOfFeeding());
        return stepperMotorDataRepository.save(stepperMotorData);
    }

    public StepperMotorData deleteById(Long id) throws StepperMotorDataNotFoundException {
        StepperMotorData stepperMotorData = findById(id);
        if(stepperMotorData !=null){
            stepperMotorDataRepository.deleteById(id);
        }
        return stepperMotorData;
    }
}
