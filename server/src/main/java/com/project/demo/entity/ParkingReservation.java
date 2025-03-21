package com.project.demo.entity;

import java.sql.Date;
import java.sql.Timestamp;
import com.project.demo.entity.base.BaseEntity;
import java.io.Serializable;
import lombok.*;
import javax.persistence.*;


/**
 * 车位预约：(ParkingReservation)表实体类
 *
 */
@Setter
@Getter
@Entity(name = "ParkingReservation")
public class ParkingReservation implements Serializable {

    // ParkingReservation编号
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "parking_reservation_id")
    private Integer parking_reservation_id;

    // 订单号
    @Basic
    private String order_number;
    // 车位编号
    @Basic
    private String parking_space_number;
    // 位置
    @Basic
    private String position;
    // 面积
    @Basic
    private String the_measure_of_area;
    // 用户
    @Basic
    private Integer user;
    // 用户姓名
    @Basic
    private String user_name;
    // 联系电话
    @Basic
    private String contact_number;
    // 开始时间
    @Basic
    private Timestamp start_time;
    // 结束时间
    @Basic
    private Timestamp end_time;
    // 预约说明
    @Basic
    private String appointment_instructions;



    // 审核状态
    @Basic
    private String examine_state;











    // 更新时间
    @Basic
    private Timestamp update_time;

    // 创建时间
    @Basic
    private Timestamp create_time;

}
