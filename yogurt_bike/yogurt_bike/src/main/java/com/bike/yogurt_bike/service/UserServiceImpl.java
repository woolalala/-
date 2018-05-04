package com.bike.yogurt_bike.service;

import com.bike.yogurt_bike.pojo.Bike;
import com.bike.yogurt_bike.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public void save(User user) {
        mongoTemplate.insert(user);

    }
    @Override
    public void update(User user) {
        //数据不存在就插入，存在就更新
        //根据用户手机号更新数据 需要把手机号设成主键
        mongoTemplate.updateFirst(new Query(Criteria.where("phoneNum").is(user.getPhoneNum())),
                Update.update("deposite",user.getDeposite()),User.class);
        mongoTemplate.updateFirst(new Query(Criteria.where("phoneNum").is(user.getPhoneNum())),
                Update.update("status",user.getStatus()),User.class);

    }
}
