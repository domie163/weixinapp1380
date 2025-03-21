package com.project.demo.controller;

import com.project.demo.entity.SharedParkingSpaces;
import com.project.demo.service.SharedParkingSpacesService;
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
 * 共享车位：(SharedParkingSpaces)表控制层
 *
 */
@RestController
@RequestMapping("/shared_parking_spaces")
public class SharedParkingSpacesController extends BaseController<SharedParkingSpaces, SharedParkingSpacesService> {

    /**
     * 共享车位对象
     */
    @Autowired
    public SharedParkingSpacesController(SharedParkingSpacesService service) {
        setService(service);
    }


    @PostMapping("/add")
    @Transactional
    public Map<String, Object> add(HttpServletRequest request) throws IOException {
        Map<String,Object> paramMap = service.readBody(request.getReader());
        Map<String, String> mapparking_space_number = new HashMap<>();
        mapparking_space_number.put("parking_space_number",String.valueOf(paramMap.get("parking_space_number")));
        List listparking_space_number = service.select(mapparking_space_number, new HashMap<>()).getResultList();
        if (listparking_space_number.size()>0){
            return error(30000, "字段车位编号内容不能重复");
        }
        this.addMap(paramMap);
        return success(1);
    }

}
