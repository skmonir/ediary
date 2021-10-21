package com.skmonir.webdiary.dto;

import com.skmonir.webdiary.model.User;

public class AuthUserResponse extends BaseResponseDto {
    User userInfo;
    String accessToken;

    public User getUserInfo() {
        return userInfo;
    }

    public void setUserInfo(User userInfo) {
        this.userInfo = userInfo;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }
}
