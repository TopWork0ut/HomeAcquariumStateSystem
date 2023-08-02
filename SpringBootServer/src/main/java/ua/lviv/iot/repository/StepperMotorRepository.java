package ua.lviv.iot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.lviv.iot.entity.StepperMotor;
import ua.lviv.iot.entity.StepperMotorData;

public interface StepperMotorRepository extends JpaRepository<StepperMotor, Long> {
}
