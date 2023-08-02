package ua.lviv.iot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ua.lviv.iot.entity.StepperMotorData;

@Repository
public interface StepperMotorDataRepository extends JpaRepository<StepperMotorData, Long> {
}
