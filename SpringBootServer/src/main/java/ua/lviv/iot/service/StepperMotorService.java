package ua.lviv.iot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.lviv.iot.entity.StepperMotor;
import ua.lviv.iot.entity.StepperMotorData;
import ua.lviv.iot.exception.StepperMotorDataNotFoundException;
import ua.lviv.iot.exception.StepperMotorNotFoundException;
import ua.lviv.iot.repository.StepperMotorDataRepository;
import ua.lviv.iot.repository.StepperMotorRepository;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class StepperMotorService {
    private StepperMotorRepository stepperMotorRepository;
    @Autowired
    public StepperMotorService(StepperMotorRepository stepperMotorRepository){
        this.stepperMotorRepository = stepperMotorRepository;
    }

    public StepperMotor saveStepperMotorInfo(StepperMotor info){
        return stepperMotorRepository.save(info);
    }
    public List<StepperMotor> findAll(){
        return stepperMotorRepository.findAll();
    }
    public StepperMotor findById(Long id) throws StepperMotorNotFoundException {
        return stepperMotorRepository.findById(id).orElseThrow(()->new StepperMotorNotFoundException("Stepper motor with id "+id+" was not found!"));
    }

    public StepperMotor updateStepperMotorInfo(Long id, StepperMotor info) throws StepperMotorNotFoundException {
        StepperMotor stepperMotor = findById(id);
//        stepperMotor.setId(id);
        stepperMotor.setUserId(info.getUserId());
        return stepperMotorRepository.save(stepperMotor);
    }

    public StepperMotor deleteById(Long id) throws StepperMotorNotFoundException {
        StepperMotor stepperMotor = findById(id);
        if(stepperMotor !=null){
            stepperMotorRepository.deleteById(id);
        }
        return stepperMotor;
    }
}
