import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

// Generate time options with 15-minute intervals
const generateTimeOptions = () => {
    const options = [];
    for (let h = 0; h < 24; h++) {
        for (let m = 0; m < 60; m += 15) {
            const hour12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
            const ampm = h >= 12 ? 'pm' : 'am';
            const label = `${hour12}:${m.toString().padStart(2, '0')}${ampm}`;
            const value = h + m / 60; // Decimal hour value
            options.push({ label, value });
        }
    }
    return options;
};

const TIME_OPTIONS = generateTimeOptions();

// Get label for a decimal hour value
const getTimeLabel = (decimalHour) => {
    const h = Math.floor(decimalHour);
    const m = Math.round((decimalHour - h) * 60);
    const hour12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
    const ampm = h >= 12 ? 'pm' : 'am';
    return `${hour12}:${m.toString().padStart(2, '0')}${ampm}`;
};

// Smart AM/PM default based on "reasonable window"
// 1-7 defaults to PM (afternoon/evening hours), 8-12 defaults to AM (morning hours)
const getSmartAmPm = (hour) => {
    if (hour >= 1 && hour <= 7) return 'pm';
    if (hour >= 8 && hour <= 12) return 'am';
    return 'am'; // Default to AM for edge cases
};

// Convert hour based on AM/PM
const convertTo24Hour = (hour, period) => {
    if (period === 'pm' && hour < 12) return hour + 12;
    if (period === 'am' && hour === 12) return 0;
    return hour;
};

// Parse user input to decimal hour with flexible format support
const parseTimeInput = (input) => {
    if (!input || input.trim() === '') return null;

    const cleaned = input.toLowerCase().trim();

    // Extract AM/PM marker if present (supports "am", "pm", "a", "p")
    let explicitPeriod = null;
    let numericPart = cleaned;

    const periodMatch = cleaned.match(/(am?|pm?)$/);
    if (periodMatch) {
        explicitPeriod = periodMatch[1].startsWith('p') ? 'pm' : 'am';
        numericPart = cleaned.slice(0, -periodMatch[1].length).trim();
    }

    // Pattern 1: "1:30" or "11:30" (with colon)
    let match = numericPart.match(/^(\d{1,2}):(\d{2})$/);
    if (match) {
        let hour = parseInt(match[1], 10);
        const minute = parseInt(match[2], 10);

        if (hour > 12 || explicitPeriod) {
            // Already 24-hour format or explicit period given
            const period = explicitPeriod || (hour >= 12 ? 'pm' : 'am');
            if (hour > 12) hour = hour; // Keep as-is for 24-hour
            else hour = convertTo24Hour(hour, period);
        } else {
            // Apply smart default
            const period = getSmartAmPm(hour);
            hour = convertTo24Hour(hour, period);
        }

        if (hour >= 0 && hour < 24 && minute >= 0 && minute < 60) {
            return hour + minute / 60;
        }
    }

    // Pattern 2: "130" → 1:30, "1100" → 11:00 (3-4 digit numeric)
    match = numericPart.match(/^(\d{3,4})$/);
    if (match) {
        const numStr = match[1];
        let hour, minute;

        if (numStr.length === 3) {
            hour = parseInt(numStr[0], 10);
            minute = parseInt(numStr.slice(1), 10);
        } else {
            hour = parseInt(numStr.slice(0, 2), 10);
            minute = parseInt(numStr.slice(2), 10);
        }

        if (minute >= 0 && minute < 60) {
            if (hour > 12 || explicitPeriod) {
                const period = explicitPeriod || (hour >= 12 ? 'pm' : 'am');
                if (hour <= 12) hour = convertTo24Hour(hour, period);
            } else {
                const period = getSmartAmPm(hour);
                hour = convertTo24Hour(hour, period);
            }

            if (hour >= 0 && hour < 24) {
                return hour + minute / 60;
            }
        }
    }

    // Pattern 3: Single or double digit "9" → 9:00, "11" → 11:00
    match = numericPart.match(/^(\d{1,2})$/);
    if (match) {
        let hour = parseInt(match[1], 10);

        if (hour >= 0 && hour <= 23) {
            if (hour > 12) {
                // Already 24-hour format (e.g., "14" → 2:00pm)
                return hour;
            } else if (explicitPeriod) {
                // Explicit period provided
                hour = convertTo24Hour(hour, explicitPeriod);
                return hour;
            } else {
                // Apply smart AM/PM default
                const period = getSmartAmPm(hour);
                hour = convertTo24Hour(hour, period);
                return hour;
            }
        }
    }

    return null;
};

export function TimePickerCombobox({
    value,
    onChange,
    placeholder = 'hh:mm',
    filterAfter,
    className,
    disabled = false,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const inputRef = useRef(null);
    const listRef = useRef(null);
    const containerRef = useRef(null);

    // Get filtered options based on input and filterAfter prop
    const filteredOptions = TIME_OPTIONS.filter((opt) => {
        // Filter by filterAfter if provided (for end time pickers)
        if (filterAfter !== undefined && opt.value <= filterAfter) {
            return false;
        }
        // Filter by search input
        if (inputValue) {
            // First try direct label match
            if (opt.label.toLowerCase().includes(inputValue.toLowerCase())) {
                return true;
            }

            // Try to parse the input and match times
            const parsedTime = parseTimeInput(inputValue);
            if (parsedTime !== null) {
                // Check if it's an exact match to a time slot (within 0.01 tolerance for floating point)
                const isExactMatch = Math.abs(opt.value - parsedTime) < 0.01;
                return isExactMatch;
            }

            // Also try matching numeric parts (e.g., "7" should show 7:00, 7:15, 7:30, 7:45)
            const numMatch = inputValue.match(/^(\d{1,2})$/);
            if (numMatch) {
                const hour = parseInt(numMatch[1], 10);
                const optHour = Math.floor(opt.value);
                // Match both AM and PM versions of the hour
                return optHour === hour || optHour === (hour + 12) % 24 || optHour === hour % 12;
            }

            return false;
        }
        return true;
    });

    // Sync display value with prop value when not focused
    useEffect(() => {
        if (!isOpen && value !== undefined && value !== null) {
            setInputValue(getTimeLabel(value));
        }
    }, [value, isOpen]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
                // Reset input to current value on blur
                if (value !== undefined && value !== null) {
                    setInputValue(getTimeLabel(value));
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [value]);

    // Scroll highlighted item into view
    useEffect(() => {
        if (isOpen && highlightedIndex >= 0 && listRef.current) {
            const items = listRef.current.querySelectorAll('[data-option]');
            if (items[highlightedIndex]) {
                items[highlightedIndex].scrollIntoView({ block: 'nearest' });
            }
        }
    }, [highlightedIndex, isOpen]);

    const handleInputChange = (e) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        setIsOpen(true);
        setHighlightedIndex(0);
    };

    const handleInputFocus = () => {
        setIsOpen(true);
        setInputValue(''); // Clear to show all options
        setHighlightedIndex(-1);
    };

    const handleInputBlur = () => {
        // Parse and validate input on blur
        const parsed = parseTimeInput(inputValue);
        if (parsed !== null) {
            onChange(parsed);
        } else if (value !== undefined && value !== null) {
            setInputValue(getTimeLabel(value));
        }
    };

    const handleSelectOption = (option) => {
        onChange(option.value);
        setInputValue(option.label);
        setIsOpen(false);
        inputRef.current?.blur();
    };

    const handleKeyDown = (e) => {
        if (!isOpen) {
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter') {
                setIsOpen(true);
                e.preventDefault();
            }
            return;
        }

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setHighlightedIndex((prev) =>
                    prev < filteredOptions.length - 1 ? prev + 1 : prev
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
                break;
            case 'Enter':
                e.preventDefault();
                if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
                    handleSelectOption(filteredOptions[highlightedIndex]);
                } else {
                    // Try to parse current input
                    const parsed = parseTimeInput(inputValue);
                    if (parsed !== null) {
                        onChange(parsed);
                        setInputValue(getTimeLabel(parsed));
                        setIsOpen(false);
                    }
                }
                break;
            case 'Escape':
                setIsOpen(false);
                if (value !== undefined && value !== null) {
                    setInputValue(getTimeLabel(value));
                }
                break;
            case 'Tab':
                setIsOpen(false);
                break;
        }
    };

    return (
        <div ref={containerRef} className={cn('relative', className)}>
            <div className="relative">
                <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={cn(
                        'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors',
                        'file:border-0 file:bg-transparent file:text-sm file:font-medium',
                        'placeholder:text-muted-foreground',
                        'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
                        'disabled:cursor-not-allowed disabled:opacity-50',
                        'pr-8'
                    )}
                />
                <ChevronDown
                    className={cn(
                        'absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none transition-transform',
                        isOpen && 'rotate-180'
                    )}
                />
            </div>

            {isOpen && (
                <div
                    ref={listRef}
                    className={cn(
                        'absolute z-50 mt-1 w-full max-h-60 overflow-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
                        'animate-in fade-in-0 zoom-in-95'
                    )}
                >
                    {filteredOptions.length === 0 ? (
                        <div className="py-2 px-3 text-sm text-muted-foreground">
                            No times found
                        </div>
                    ) : (
                        filteredOptions.map((option, index) => (
                            <div
                                key={option.value}
                                data-option
                                onClick={() => handleSelectOption(option)}
                                onMouseEnter={() => setHighlightedIndex(index)}
                                className={cn(
                                    'relative flex cursor-pointer select-none items-center rounded-sm px-3 py-2 text-sm outline-none',
                                    'hover:bg-accent hover:text-accent-foreground',
                                    highlightedIndex === index && 'bg-accent text-accent-foreground',
                                    value === option.value && 'font-medium'
                                )}
                            >
                                {option.label}
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

export default TimePickerCombobox;
