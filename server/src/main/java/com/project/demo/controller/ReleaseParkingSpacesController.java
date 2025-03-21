package com.project.demo.controller;

import com.project.demo.entity.ReleaseParkingSpaces;
import com.project.demo.service.ReleaseParkingSpacesService;
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
 * 发布车位：(ReleaseParkingSpaces)表控制层
 *
 */
@RestController
@RequestMapping("/release_parking_spaces")
public class ReleaseParkingSpacesController extends BaseController<ReleaseParkingSpaces, ReleaseParkingSpacesService> {

    /**
     * 发布车位对象
     */
    @Autowired
    public ReleaseParkingSpacesController(ReleaseParkingSpacesService service) {
        setService(service);
    }


    @PostMapping("/add")
    @Transactional
    public Map<String, Object> add(HttpServletRequest request) throws IOException {
        Map<String,Object> paramMap = service.readBody(request.getReader());
        this.addMap(paramMap);
        return success(1);
    }

}
