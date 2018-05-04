package com.bike.yogurt_bike.service;

import com.bike.yogurt_bike.pojo.Bike;
import org.springframework.data.geo.GeoResult;

import java.util.List;

public interface BikeService {
    public void save(Bike bike);
    public List<GeoResult<Bike>> findNear(double longitude, double latitude);
}
