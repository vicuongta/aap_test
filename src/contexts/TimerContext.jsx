import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

const TimerContext = createContext(null);

// Parse duration string like "30 min", "1 hour", "1.5 hours" to seconds
function parseDurationToSeconds(duration) {
    if (!duration) return 0;

    const lower = duration.toLowerCase();

    if (lower.includes('hour')) {
        const match = lower.match(/(\d+\.?\d*)/);
        if (match) {
            return parseFloat(match[1]) * 60 * 60;
        }
    }

    if (lower.includes('min')) {
        const match = lower.match(/(\d+)/);
        if (match) {
            return parseInt(match[1], 10) * 60;
        }
    }

    return 0;
}

export function TimerProvider({ children }) {
    const [activeTask, setActiveTask] = useState(null); // { id, title, duration }
    const [remainingSeconds, setRemainingSeconds] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const intervalRef = useRef(null);

    // Start timer for a task
    const startTimer = useCallback((task) => {
        // Stop any existing timer
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        const seconds = parseDurationToSeconds(task.duration);
        setActiveTask(task);
        setRemainingSeconds(seconds);
        setIsPaused(false);
    }, []);

    // Pause/Resume
    const togglePause = useCallback(() => {
        setIsPaused(prev => !prev);
    }, []);

    // Stop timer
    const stopTimer = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setActiveTask(null);
        setRemainingSeconds(0);
        setIsPaused(false);
    }, []);

    // Countdown effect
    useEffect(() => {
        if (activeTask && !isPaused && remainingSeconds > 0) {
            intervalRef.current = setInterval(() => {
                setRemainingSeconds(prev => {
                    if (prev <= 1) {
                        clearInterval(intervalRef.current);
                        intervalRef.current = null;
                        // Timer completed - could trigger notification here
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [activeTask, isPaused, remainingSeconds]);

    // Format seconds to MM:SS or HH:MM:SS
    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        if (hrs > 0) {
            return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const value = {
        activeTask,
        remainingSeconds,
        isPaused,
        isRunning: !!activeTask && remainingSeconds > 0,
        startTimer,
        togglePause,
        stopTimer,
        formatTime,
    };

    return (
        <TimerContext.Provider value={value}>
            {children}
        </TimerContext.Provider>
    );
}

export function useTimer() {
    const context = useContext(TimerContext);
    if (!context) {
        throw new Error('useTimer must be used within a TimerProvider');
    }
    return context;
}

export default TimerContext;
