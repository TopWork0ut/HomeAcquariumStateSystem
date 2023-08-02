package ua.lviv.iot.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "ultrasonic_sensor_data")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UltrasonicSensorData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDateTime time;
    private Long distance;
    private Long ultrasonicSensorId;
}
