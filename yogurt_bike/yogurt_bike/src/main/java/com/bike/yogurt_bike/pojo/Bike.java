package com.bike.yogurt_bike.pojo;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexType;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexed;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.lang.reflect.Type;

//Bike类与mongodb中的bikes collection关联
@Document(collection = "bikes")

public class Bike {
    //主键（唯一，建立索引） id对应mongodb中的_id
    @Id
    private String id;

    //表示经纬度的数组，[精度、纬度]
    @GeoSpatialIndexed(type = GeoSpatialIndexType.GEO_2DSPHERE)
    private double[] location;

    //建立索引
    @Indexed
    private long bikenum;
    private int status;
    public double[] getLocation() {
        return location;
    }

    public void setLocation(double[] location) {
        this.location = location;
    }

    //private double longitude;
    //private double latitude;





    public void setId(String id) {
        this.id = id;
    }



    public void setStatus(int status) {
        this.status = status;
    }

    public String getId() {
        return id;
    }



    public int getStatus() {
        return status;
    }

    public void setBikenum(long bikenum) {
        this.bikenum = bikenum;
    }

    public long getBikenum() {
        return bikenum;
    }
}
