package ua.lviv.iot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ua.lviv.iot.entity.FilterDCMotorData;

import java.util.Collection;

@Repository
public interface FilterDCMotorDataRepository extends JpaRepository<FilterDCMotorData, Long> {

}
