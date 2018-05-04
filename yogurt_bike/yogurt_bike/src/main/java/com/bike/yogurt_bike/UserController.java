package com.bike.yogurt_bike;

import com.bike.yogurt_bike.pojo.User;
import com.bike.yogurt_bike.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping("/user/register")
    @ResponseBody
    public boolean reg(@RequestBody User user) {
        userService.save(user);
        return true;
    }
    @RequestMapping("/user/deposite")
    @ResponseBody
   public boolean deposite(@RequestBody User user) {
        boolean flag = true;
        try{
            userService.update(user);

        }catch (Exception e) {
            e.printStackTrace();
            flag = false;

        }

        return flag;
    }
}

