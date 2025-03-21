package com.project.demo.entity;

import java.sql.Date;
import java.sql.Timestamp;
import com.project.demo.entity.base.BaseEntity;
import java.io.Serializable;
import lombok.*;
import javax.persistence.*;


/**
 * 共享车位：(SharedParkingSpaces)表实体类
 *
 */
@Setter
@Getter
@Entity(name = "SharedParkingSpaces")
public class SharedParkingSpaces implements Serializable {

    // SharedParkingSpaces编号
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "shared_parking_spaces_id")
    private Integer shared_parking_spaces_id;

    // 车位编号
    @Basic
    private String parking_space_number;
    // 位置
    @Basic
    private String position;
    // 状态
    @Basic
    private String state;
    // 车位图片
    @Basic
    private String parking_space_image;
    // 面积
    @Basic
    private String the_measure_of_area;
    // 收费规则
    @Basic
    private String fee_rules;

    // 点击数
    @Basic
    private Integer hits;

    // 点赞数
    @Basic
    private Integer praise_len;












    // 更新时间
    @Basic
    private Timestamp update_time;

    // 创建时间
    @Basic
    private Timestamp create_time;

}
