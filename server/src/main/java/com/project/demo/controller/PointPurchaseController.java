package com.project.demo.controller;

import com.project.demo.entity.PointPurchase;
import com.project.demo.service.PointPurchaseService;
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
 * 积分购买：(PointPurchase)表控制层
 *
 */
@RestController
@RequestMapping("/point_purchase")
public class PointPurchaseController extends BaseController<PointPurchase, PointPurchaseService> {

    /**
     * 积分购买对象
     */
    @Autowired
    public PointPurchaseController(PointPurchaseService service) {
        setService(service);
    }


    @PostMapping("/add")
    @Transactional
    public Map<String, Object> add(HttpServletRequest request) throws IOException {
        Map<String,Object> paramMap = service.readBody(request.getReader());
        this.addMap(paramMap);
        String sql = "SELECT MAX(point_purchase_id) AS max FROM "+"`point_purchase`";
        Query select = service.runCountSql(sql);
        Integer max = (Integer) select.getSingleResult();
        sql = "UPDATE `user_points` INNER JOIN `point_purchase` ON user_points.credit_card_number=point_purchase.credit_card_number SET user_points.residual_integral= user_points.residual_integral + point_purchase.purchase_points WHERE point_purchase.point_purchase_id="+max;
        select = service.runCountSql(sql);
        select.executeUpdate();
        return success(1);
    }

}
