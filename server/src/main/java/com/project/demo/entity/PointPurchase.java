package com.project.demo.entity;

import java.sql.Date;
import java.sql.Timestamp;
import com.project.demo.entity.base.BaseEntity;
import java.io.Serializable;
import lombok.*;
import javax.persistence.*;


/**
 * 积分购买：(PointPurchase)表实体类
 *
 */
@Setter
@Getter
@Entity(name = "PointPurchase")
public class PointPurchase implements Serializable {

    // PointPurchase编号
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "point_purchase_id")
    private Integer point_purchase_id;

    // 用户
    @Basic
    private Integer user;
    // 用户姓名
    @Basic
    private String user_name;
    // 积分卡号
    @Basic
    private String credit_card_number;
    // 购买积分
    @Basic
    private Integer purchase_points;
    // 购买说明
    @Basic
    private String purchase_instructions;














    // 更新时间
    @Basic
    private Timestamp update_time;

    // 创建时间
    @Basic
    private Timestamp create_time;

}
