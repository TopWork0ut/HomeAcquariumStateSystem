package ua.lviv.iot.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "stepper_motor_data")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StepperMotorData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDateTime timeOfFeeding;
    private Long motorId;
}
