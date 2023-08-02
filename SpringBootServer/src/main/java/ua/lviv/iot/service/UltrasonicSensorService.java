package ua.lviv.iot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.lviv.iot.entity.UltrasonicSensor;
import ua.lviv.iot.exception.UltrasonicNotFoundException;
import ua.lviv.iot.repository.UltrasonicSensorRepository;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class UltrasonicSensorService {

    private UltrasonicSensorRepository ultrasonicSensorRepository;
    @Autowired
    public UltrasonicSensorService(UltrasonicSensorRepository ultrasonicSensorRepository){
        this.ultrasonicSensorRepository = ultrasonicSensorRepository;
    }

    public UltrasonicSensor saveInfo(UltrasonicSensor info){
//        LocalDateTime currentDateTime = LocalDateTime.now().withNano(0);;
//        info.setTime(currentDateTime);
        return ultrasonicSensorRepository.save(info);
    }

//    public UltrasonicSensor saveInfoByParams(String distance){
//        UltrasonicSensor info = new UltrasonicSensor();
//        LocalDateTime currentDateTime = LocalDateTime.now().withNano(0);
//        info.setDistance(Long.valueOf(distance));
//        info.setTime(currentDateTime);
//        return ultrasonicSensorRepository.save(info);
//    }

    public UltrasonicSensor findById(Long id) throws UltrasonicNotFoundException {
        return ultrasonicSensorRepository.findById(id).orElseThrow(()->new UltrasonicNotFoundException("Ultrasonic with id "+id+" was not found!"));
    }
    public UltrasonicSensor update(Long id, UltrasonicSensor info) throws UltrasonicNotFoundException {
        UltrasonicSensor ultrasonicSensor = findById(id);
        ultrasonicSensor.setId(id);
        ultrasonicSensor.setUserId(info.getUserId());
//        ultrasonicSensor.setDistance(info.getDistance());
//        ultrasonicSensor.setTime(info.getTime());
        return ultrasonicSensorRepository.save(ultrasonicSensor);
    }

    public UltrasonicSensor deleteById(Long id) throws UltrasonicNotFoundException {
        UltrasonicSensor ultrasonicSensor = findById(id);
        ultrasonicSensorRepository.deleteById(id);
        return ultrasonicSensor;
    }


    public List<UltrasonicSensor> findAll() {
        return ultrasonicSensorRepository.findAll();
    }
}
