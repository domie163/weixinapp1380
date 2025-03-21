package com.project.demo.entity;

import java.sql.Date;
import java.sql.Timestamp;
import com.project.demo.entity.base.BaseEntity;
import java.io.Serializable;
import lombok.*;
import javax.persistence.*;


/**
 * 车辆信息：(VehicleInformation)表实体类
 *
 */
@Setter
@Getter
@Entity(name = "VehicleInformation")
public class VehicleInformation implements Serializable {

    // VehicleInformation编号
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "vehicle_information_id")
    private Integer vehicle_information_id;

    // 用户
    @Basic
    private Integer user;
    // 车牌号
    @Basic
    private String license_plate_number;
    // 车主姓名
    @Basic
    private String owners_name;
    // 车辆照片
    @Basic
    private String vehicle_photos;
    // 联系电话
    @Basic
    private String contact_number;














    // 更新时间
    @Basic
    private Timestamp update_time;

    // 创建时间
    @Basic
    private Timestamp create_time;

}
