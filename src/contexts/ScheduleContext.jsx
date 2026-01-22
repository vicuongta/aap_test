import React, { createContext, useContext, useState } from 'react';
import { addHours, setHours, setMinutes } from 'date-fns';

// Initial shared data
const now = new Date();

const initialFixedItems = [
    {
        id: 1,
        title: 'Calculus II Class',
        days: ['monday', 'wednesday', 'friday'],
        startHour: 10,
        endHour: 11.5,
        type: 'school',
        details: 'Room 304 | Chapter 5',
        associatedDeadline: ''
    },
    {
        id: 2,
        title: 'Part-time Job',
        days: ['tuesday', 'thursday'],
        startHour: 14,
        endHour: 18,
        type: 'work',
        details: 'Campus Bookstore',
        associatedDeadline: ''
    },
    {
        id: 3,
        title: 'Gym Session',
        days: ['monday', 'wednesday', 'friday'],
        startHour: 7,
        endHour: 8,
        type: 'personal',
        details: 'Leg Day',
        associatedDeadline: ''
    },
    {
        id: 4,
        title: 'Physics Lab',
        days: ['thursday'],
        startHour: 13,
        endHour: 15,
        type: 'school',
        details: 'Room 302',
        associatedDeadline: 'Lab Report Due'
    },
];

const initialTasks = [
    {
        id: 101,
        title: 'Assignment Due',
        course: 'CS301',
        dueDate: new Date(Date.now() + 86400000 * 2),
        startHour: 9,
        endHour: 10,
        priority: 'assignment',
        type: 'deadline',
        details: 'Submit to Canvas',
        associatedDeadline: ''
    },
    {
        id: 102,
        title: 'Quiz',
        course: 'MATH201',
        dueDate: new Date(),
        startHour: 10,
        endHour: 11,
        priority: 'quiz',
        type: 'deadline',
        details: 'Online Quiz',
        associatedDeadline: ''
    },
];

const ScheduleContext = createContext(null);

export function ScheduleProvider({ children }) {
    const [fixedItems, setFixedItems] = useState(initialFixedItems);
    const [tasks, setTasks] = useState(initialTasks);

    const value = {
        fixedItems,
        setFixedItems,
        tasks,
        setTasks,
    };

    return (
        <ScheduleContext.Provider value={value}>
            {children}
        </ScheduleContext.Provider>
    );
}

export function useSchedule() {
    const context = useContext(ScheduleContext);
    if (!context) {
        throw new Error('useSchedule must be used within a ScheduleProvider');
    }
    return context;
}

export default ScheduleContext;
