package ua.lviv.iot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ua.lviv.iot.entity.UltrasonicSensor;
import ua.lviv.iot.entity.UltrasonicSensorData;

@Repository
public interface UltrasonicSensorRepository extends JpaRepository<UltrasonicSensor, Long> {

}
