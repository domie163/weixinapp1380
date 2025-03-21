package com.project.demo.controller;

import com.project.demo.entity.OrderInformation;
import com.project.demo.service.OrderInformationService;
import com.project.demo.controller.base.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.persistence.Query;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.*;


/**
 * 订单信息：(OrderInformation)表控制层
 *
 */
@RestController
@RequestMapping("/order_information")
public class OrderInformationController extends BaseController<OrderInformation, OrderInformationService> {

    /**
     * 订单信息对象
     */
    @Autowired
    public OrderInformationController(OrderInformationService service) {
        setService(service);
    }


    @PostMapping("/add")
    @Transactional
    public Map<String, Object> add(HttpServletRequest request) throws IOException {
        Map<String,Object> paramMap = service.readBody(request.getReader());
        this.addMap(paramMap);
        String sql = "SELECT MAX(order_information_id) AS max FROM "+"`order_information`";
        Query select = service.runCountSql(sql);
        Integer max = (Integer) select.getSingleResult();
        sql = ("SELECT count(*) count FROM `user_points` INNER JOIN `order_information` ON user_points.credit_card_number=order_information.credit_card_number WHERE user_points.residual_integral < order_information.consumption_points AND order_information.order_information_id="+max).replaceAll("&#60;","<");
        select = service.runCountSql(sql);
        Integer count = Integer.valueOf(String.valueOf(select.getSingleResult()));
        if(count>0){
            sql = "delete from "+"order_information"+" WHERE "+"order_information_id"+" ="+max;
            select = service.runCountSql(sql);
            select.executeUpdate();
            return error(30000,"积分不足!");
        }
        sql = "UPDATE `user_points` INNER JOIN `order_information` ON user_points.credit_card_number=order_information.credit_card_number SET user_points.residual_integral= user_points.residual_integral - order_information.consumption_points WHERE order_information.order_information_id="+max;
        select = service.runCountSql(sql);
        select.executeUpdate();
        return success(1);
    }

}
