package com.project.demo.entity;

import java.sql.Date;
import java.sql.Timestamp;
import com.project.demo.entity.base.BaseEntity;
import java.io.Serializable;
import lombok.*;
import javax.persistence.*;


/**
 * 订单信息：(OrderInformation)表实体类
 *
 */
@Setter
@Getter
@Entity(name = "OrderInformation")
public class OrderInformation implements Serializable {

    // OrderInformation编号
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_information_id")
    private Integer order_information_id;

    // 订单号
    @Basic
    private String order_number;
    // 车位编号
    @Basic
    private String parking_space_number;
    // 位置
    @Basic
    private String position;
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
    // 租赁时长
    @Basic
    private String lease_duration;
    // 积分卡号
    @Basic
    private String credit_card_number;
    // 消费积分
    @Basic
    private String consumption_points;
    // 消费说明
    @Basic
    private String consumption_instructions;














    // 更新时间
    @Basic
    private Timestamp update_time;

    // 创建时间
    @Basic
    private Timestamp create_time;

}
