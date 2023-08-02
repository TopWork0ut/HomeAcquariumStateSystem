package ua.lviv.iot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.lviv.iot.entity.StepperMotorData;
import ua.lviv.iot.entity.UltrasonicSensor;
import ua.lviv.iot.entity.UltrasonicSensorData;
import ua.lviv.iot.exception.UltrasonicNotFoundException;
import ua.lviv.iot.exception.UltrasonicSensorAlreadyExists;
import ua.lviv.iot.exception.UltrasonicSensorDataNotFoundException;
import ua.lviv.iot.exception.UsernameAlreadyExists;
import ua.lviv.iot.repository.UltrasonicSensorDataRepository;
import ua.lviv.iot.repository.UltrasonicSensorRepository;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Service
public class UltrasonicSensorDataService {
    private UltrasonicSensorDataRepository ultrasonicSensorDataRepository;
    @Autowired
    public UltrasonicSensorDataService(UltrasonicSensorDataRepository ultrasonicSensorDataRepository){
        this.ultrasonicSensorDataRepository = ultrasonicSensorDataRepository;
    }

    public UltrasonicSensorData saveInfo(UltrasonicSensorData info) throws UltrasonicSensorAlreadyExists {
//        boolean noneMatch = findAll().stream().noneMatch(ultrasonicData -> ultrasonicData.getUltrasonicSensorId().equals(info.getUltrasonicSensorId()));
//        if (noneMatch) {
            info.setTime(LocalDateTime.parse(LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS).format(DateTimeFormatter.ISO_LOCAL_DATE_TIME)));
            return ultrasonicSensorDataRepository.save(info);
//        } else {
//            throw new UltrasonicSensorAlreadyExists("This ultrasonic already exists! Choose another");
//        }
    }

    public List<UltrasonicSensorData> findAllByUltrasonicID(Long Stepperid){
        List<UltrasonicSensorData> allData = ultrasonicSensorDataRepository.findAll();
        List<UltrasonicSensorData> filteredData = new ArrayList<>();
        for (UltrasonicSensorData data : allData) {
            if (data.getUltrasonicSensorId().equals(Stepperid)) {
                filteredData.add(data);
            }
        }
        return filteredData;
    }

//    public UltrasonicSensor saveInfoByParams(String distance){
//        UltrasonicSensor info = new UltrasonicSensor();
//        LocalDateTime currentDateTime = LocalDateTime.now().withNano(0);
//        info.setDistance(Long.valueOf(distance));
//        info.setTime(currentDateTime);
//        return ultrasonicSensorRepository.save(info);
//    }

    public UltrasonicSensorData findById(Long id) throws UltrasonicSensorDataNotFoundException {
        return ultrasonicSensorDataRepository.findById(id).orElseThrow(()->new UltrasonicSensorDataNotFoundException("Ultrasonic data with id "+id+" was not found!"));
    }
    public UltrasonicSensorData update(Long id, UltrasonicSensorData info) throws UltrasonicSensorAlreadyExists, UltrasonicSensorDataNotFoundException {
        boolean noneMatch = findAll().stream().noneMatch(ultrasonicData -> ultrasonicData.getUltrasonicSensorId().equals(info.getUltrasonicSensorId()));
        if (noneMatch) {
            UltrasonicSensorData ultrasonicSensorData = findById(id);
            ultrasonicSensorData.setId(id);
            ultrasonicSensorData.setTime(info.getTime());
            ultrasonicSensorData.setDistance(info.getDistance());
            return ultrasonicSensorDataRepository.save(ultrasonicSensorData);
        } else {
            throw new UltrasonicSensorAlreadyExists("This ultrasonic already exists! Choose another");
        }
    }

    public UltrasonicSensorData deleteById(Long id) throws UltrasonicSensorDataNotFoundException {
        UltrasonicSensorData ultrasonicSensorData = findById(id);
        ultrasonicSensorDataRepository.deleteById(id);
        return ultrasonicSensorData;
    }

    public List<UltrasonicSensorData> findAll() {
        return ultrasonicSensorDataRepository.findAll();
    }
}
