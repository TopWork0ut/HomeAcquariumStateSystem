package ua.lviv.iot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ua.lviv.iot.entity.FilterDCMotor;
import ua.lviv.iot.entity.FilterDCMotorData;

@Repository
public interface FilterDCMotorRepository extends JpaRepository<FilterDCMotor, Long> {
}
