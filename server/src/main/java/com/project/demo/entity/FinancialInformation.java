package com.project.demo.entity;

import java.sql.Date;
import java.sql.Timestamp;
import com.project.demo.entity.base.BaseEntity;
import java.io.Serializable;
import lombok.*;
import javax.persistence.*;


/**
 * 财务信息：(FinancialInformation)表实体类
 *
 */
@Setter
@Getter
@Entity(name = "FinancialInformation")
public class FinancialInformation implements Serializable {

    // FinancialInformation编号
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "financial_information_id")
    private Integer financial_information_id;

    // 报表名称
    @Basic
    private String report_name;
    // 统计周期
    @Basic
    private String statistical_period;
    // 收入金额
    @Basic
    private String income_amount;
    // 收入说明
    @Basic
    private String revenue_description;














    // 更新时间
    @Basic
    private Timestamp update_time;

    // 创建时间
    @Basic
    private Timestamp create_time;

}
