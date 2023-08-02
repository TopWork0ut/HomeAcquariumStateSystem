package ua.lviv.iot.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "dc_motor_data")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FilterDCMotorData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDateTime startTimeOfFiltering;
    private LocalDateTime endTimeOfFiltering;
    private Long dcMotorId;
}
