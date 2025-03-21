package com.project.demo.entity;

import java.sql.Date;
import java.sql.Timestamp;
import com.project.demo.entity.base.BaseEntity;
import java.io.Serializable;
import lombok.*;
import javax.persistence.*;


/**
 * 发布车位：(ReleaseParkingSpaces)表实体类
 *
 */
@Setter
@Getter
@Entity(name = "ReleaseParkingSpaces")
public class ReleaseParkingSpaces implements Serializable {

    // ReleaseParkingSpaces编号
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "release_parking_spaces_id")
    private Integer release_parking_spaces_id;

    // 发布用户
    @Basic
    private Integer publish_users;
    // 用户姓名
    @Basic
    private String user_name;
    // 车位地址
    @Basic
    private String parking_address;
    // 车位号
    @Basic
    private String parking_space_number;
    // 车位图片
    @Basic
    private String parking_space_image;
    // 共享时间
    @Basic
    private String shared_time;
    // 租借说明
    @Basic
    private String lease_instructions;

    // 点击数
    @Basic
    private Integer hits;

    // 点赞数
    @Basic
    private Integer praise_len;





	// 计时器标题
	@Basic
	private String timer_title;

	// 计时开始时间
	@Basic
	private Timestamp timing_start_time;

	// 计时结束时间
	@Basic
	private Timestamp timing_end_time;

    // 当前位置
    @Basic
    private String location_address;
    // 当前位置经度
    @Basic
    private String location_lng;
    // 当前位置纬度
    @Basic
    private String location_lat;






    // 更新时间
    @Basic
    private Timestamp update_time;

    // 创建时间
    @Basic
    private Timestamp create_time;

}
