package com.bike.yogurt_bike;

import com.bike.yogurt_bike.pojo.Bike;
import com.bike.yogurt_bike.service.BikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.geo.GeoResult;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller

public class BikeController {

    //到spring容器中 查找BikeService类型的实例，然后注入到BikeController实例中
    @Autowired
    private BikeService bikeService;


    @RequestMapping("/bike/add")
    @ResponseBody
    public String addBike(@RequestBody Bike bike) {
       //调用service，将数据保存到mongodb中
        bikeService.save(bike);
        return "success";
    }
    @RequestMapping("/bike/findNear")
    @ResponseBody
    public List<GeoResult<Bike>> findNear(double longitude, double latitude) {
        List<GeoResult<Bike>> bikes = bikeService.findNear(longitude, latitude);
        return bikes;
    }



}
