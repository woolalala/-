package com.bike.yogurt_bike.service;

import com.bike.yogurt_bike.pojo.Bike;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.geo.GeoResult;
import org.springframework.data.geo.GeoResults;
import org.springframework.data.geo.Metric;
import org.springframework.data.geo.Metrics;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.NearQuery;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BikeServiceImpl implements BikeService {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public void save(Bike bike) {
        //mongoTemplate.insert(bike, "bikes");
        mongoTemplate.insert(bike); //Bike类中的注解将Bike与mongo的collec对应

    }

    //根据当前经纬度查找附近的单车
    @Override
    public List<GeoResult<Bike>> findNear(double longitude, double latitude) {

        //return mongoTemplate.findAll(Bike.class);
        NearQuery nearQuery = NearQuery.near(longitude, latitude);
        //指定查找范围和距离单位
        nearQuery.maxDistance(0.2, Metrics.KILOMETERS);
        GeoResults<Bike> geoResult = mongoTemplate.geoNear(nearQuery.query(new Query(Criteria.where("status").is(0)).limit(20)), Bike.class);
        return (List<GeoResult<Bike>>) geoResult.getContent();

    }








}
