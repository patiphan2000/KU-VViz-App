import React from 'react'
import { useState } from 'react';


export const CourseDataContext = React.createContext();

export const CourseDataProvider = ({ children }) => {
    const [data, setData] = useState({
        'course': [],
        'stdGrade': [],
        'stdEnroll': []
    });
  
    return (
        <CourseDataContext.Provider value={{ data, setData }}>
            {children}
        </CourseDataContext.Provider>
    );
};