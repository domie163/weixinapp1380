package com.project.demo.entity;

import java.sql.Date;
import java.sql.Timestamp;
import com.project.demo.entity.base.BaseEntity;
import java.io.Serializable;
import lombok.*;
import javax.persistence.*;


/**
 * 用户积分：(UserPoints)表实体类
 *
 */
@Setter
@Getter
@Entity(name = "UserPoints")
public class UserPoints implements Serializable {

    // UserPoints编号
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_points_id")
    private Integer user_points_id;

    // 用户
    @Basic
    private Integer user;
    // 用户姓名
    @Basic
    private String user_name;
    // 积分卡号
    @Basic
    private String credit_card_number;
    // 剩余积分
    @Basic
    private Integer residual_integral;
    // 备注
    @Basic
    private String remarks;














    // 更新时间
    @Basic
    private Timestamp update_time;

    // 创建时间
    @Basic
    private Timestamp create_time;

}
