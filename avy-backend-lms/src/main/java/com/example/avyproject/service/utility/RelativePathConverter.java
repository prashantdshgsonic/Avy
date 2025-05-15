package com.example.avyproject.service.utility;

import java.util.regex.Matcher;
import java.util.regex.Pattern;
public class RelativePathConverter {

    public static String getRelativePath(String fullPath) {
        if(fullPath==null){
            return null;
        }
        String regex = "([\\\\/]video[\\\\/]|[\\\\/]images[\\\\/]|[\\\\/]pdf[\\\\/]).+";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(fullPath);
        if (matcher.find()) {
            return matcher.group(0).replace("\\", "/");
        } else {
            throw new IllegalArgumentException("Invalid path format");
        }
    }
}
