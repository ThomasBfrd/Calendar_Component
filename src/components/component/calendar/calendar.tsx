import {RefObject, useEffect, useMemo, useRef, useState} from "react";
import "./calendar.scss";
import Icon from "../icon/icon";

export interface CalendarProps {
    cancelButton?: string;
    submitButton?: string;
    backgroundColor?: string;
    primaryColor?: string;
    secondaryColor?: string;
    tertiaryColor?: string;
    activeColor?: string;
    textPrimaryColor?: string;
    textSecondaryColor?: string;
    hoverColor?: string;
    onDateChange?: (date: string) => void;
}

export interface MonthDto {
    day: number;
    value: string;
}

const MONTHS = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
const days = [
    {
        index: 1,
        day: 'Lu'
    },
    {
        index: 2,
        day: 'Ma'
    },
    {
        index: 3,
        day: 'Me'
    },
    {
        index: 4,
        day: 'Je'
    },
    {
        index: 5,
        day: 'Ve'
    },
    {
        index: 6,
        day: 'Sa'
    },
    {
        index: 7,
        day: 'Di'
    },
]
const YEARS: Array<number> = [];
for (let i = 1950; i <= 2050; i++) {
    YEARS.push(i);
}

const Calendar = ({cancelButton = "Cancel", submitButton = "Submit", backgroundColor = "#ffffff", primaryColor = "#7247EC",
                      secondaryColor = "#ffffff", tertiaryColor = "#d0d0d0", activeColor = "#a38cef",
                      textPrimaryColor = "#FFFFFE", textSecondaryColor = "#2D2C2F", hoverColor = "#f4f4f4",
                      onDateChange}: CalendarProps) => {

    const [date, setDate] = useState(new Date());
    const [resultDate, setResultDate] = useState('');
    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());
    const [showCalendar, setShowCalendar] = useState(false);
    const [showYearDropdown, setShowYearDropdown] = useState(false);
    const [showMonthDropdown, setShowMonthDropdown] = useState(false);
    const dropdownYearRef: RefObject<HTMLDivElement | null> = useRef<HTMLDivElement | null>(null);
    const dropdownMonthRef: RefObject<HTMLDivElement | null> = useRef<HTMLDivElement | null>(null);
    const calendarRef: RefObject<HTMLDivElement | null> = useRef<HTMLDivElement | null>(null);
    const currentMonthRef: RefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null);
    const currentYearRef: RefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null);

    const currentMonth = useMemo(() => {
        const days: Array<MonthDto> = [];
        for (let i = 1; i <= getDaysInMonth(); i++) {
            const day: string = new Date(year, month, i).toDateString();
            days.push({
                day: i,
                value: day,
            });
        }
        return days;
    }, [year, month]);

    const calendar = useMemo(() => {
        if (currentMonth.length === 0) return;

        const firstDayOfMonth = new Date(year, month, 1);
        const positionOfTheFirstDayInTheWeek = (firstDayOfMonth.getDay() + 6) % 7;

        const before = Array(positionOfTheFirstDayInTheWeek);
        for (let i = 0; i < positionOfTheFirstDayInTheWeek; i++) {
            const lastDayPreviousMonth = new Date(year, month, 0).getDate();
            const day: string = new Date(year, month - 1, lastDayPreviousMonth - i).toDateString();
            before[i] = {
                day: lastDayPreviousMonth - i,
                value: day,
            };
        }
        before.reverse();

        const after = Array(42 - (positionOfTheFirstDayInTheWeek + (currentMonth.length)));
        for (let i = 0; i < after.length; i++) {
            const day: string = new Date(year, month + 1, i + 1).toDateString();
            after[i] = {
                day: i + 1,
                value: day
            }
        }

        return [...before, ...currentMonth, ...after];
    }, [currentMonth, year, month])

    useEffect(() => {
        document.documentElement.style.setProperty("--calendar-background-color", backgroundColor);
        document.documentElement.style.setProperty("--calendar-primary-color", primaryColor);
        document.documentElement.style.setProperty("--calendar-secondary-color", secondaryColor);
        document.documentElement.style.setProperty("--calendar-tertiary-color", tertiaryColor);
        document.documentElement.style.setProperty("--calendar-active-color", activeColor);
        document.documentElement.style.setProperty("--calendar-text-primary-color", textPrimaryColor);
        document.documentElement.style.setProperty("--calendar-text-secondary-color", textSecondaryColor);
        document.documentElement.style.setProperty("--calendar-hover-color", hoverColor);
    }, [primaryColor, secondaryColor, activeColor, textPrimaryColor, textSecondaryColor, hoverColor, backgroundColor, tertiaryColor]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
                setShowCalendar(false);
                setShowMonthDropdown(false);
                setShowYearDropdown(false);
            } else if (calendarRef.current && dropdownMonthRef.current && !dropdownMonthRef.current.contains(event.target as Node)) {
                setShowMonthDropdown(false);
            } else if (calendarRef.current && dropdownYearRef.current && !dropdownYearRef.current.contains(event.target as Node)) {
                setShowYearDropdown(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [calendarRef, dropdownYearRef, dropdownMonthRef]);

    useEffect(() => {
        if (showYearDropdown && currentYearRef.current) {
            currentYearRef.current.scrollIntoView({
                behavior: 'instant',
                block: 'center',
                inline: 'center',
            })
        }

        if (showMonthDropdown && currentMonthRef.current) {
            currentMonthRef.current.scrollIntoView({
                behavior: 'instant',
                block: 'center',
                inline: 'center',
            })
        }
    }, [showMonthDropdown, showYearDropdown])

    function getDaysInMonth() {
        return new Date(year, month + 1, 0).getDate();
    }

    function handleSetDate(day: MonthDto) {
        setDate(new Date(day.value));
    }

    function handleChangeYear(value: number) {
        setYear(value);
        setShowYearDropdown(false);
    }

    function handleChangeMonth(value: number) {
        setMonth(MONTHS.indexOf(MONTHS[value]));
        setShowMonthDropdown(false);
    }

    function handleResetCalendar() {
        setYear(new Date().getFullYear());
        setMonth(new Date().getMonth());
        setDate(new Date());
    }

    function toggleYearDropdown() {
        setShowYearDropdown(true);
    }

    function toggleMonthDropdown() {
        setShowMonthDropdown(true);
    }

    function handleShowCalendar() {
        setShowCalendar(!showCalendar);
    }

    function setClassNameDays(monthValue: MonthDto) {
        const formatDate = new Date(monthValue.value);
        const isSameMonth = formatDate.getMonth() === month && formatDate.getFullYear() === year;
        const isToday = monthValue.value === date.toDateString();

        if (!isSameMonth) return "body-day mask";
        if (isToday) return "body-day highlight";
        return "body-day";
    }

    function handleSubmitDate() {
        setResultDate(date.toLocaleDateString());
        setShowCalendar(false);

        if (onDateChange) {
            onDateChange(date.toLocaleDateString());
        }
    }

    return (
        <div className="container">
            <input type="text" onClick={handleShowCalendar} defaultValue={resultDate ?? ''}></input>
            {showCalendar ? (
                <div className="calendar-container">
                <div className="calendar" ref={calendarRef}>
                    <div className="calendar-header">
                        <div className="reload" onClick={handleResetCalendar}>
                            <Icon />
                        </div>
                        <div className="dropdowns">
                            <div className="month">
                                <button onClick={toggleMonthDropdown} className="select-button">{MONTHS[month]} <span
                                    className="arrow down"></span></button>
                                {showMonthDropdown && (
                                    <div className="dropdown" ref={dropdownMonthRef}>
                                        {MONTHS.map((m) => (
                                            <div
                                                key={m}
                                                className="dropdown-item"
                                                ref={m === MONTHS[month] ? currentMonthRef : null}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleChangeMonth(MONTHS.indexOf(m));
                                                }}                                        >
                                                <p className={m === MONTHS[month] ? "select-highlight" : ""}>{m}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="year">
                                <button onClick={toggleYearDropdown} className="select-button">{year}
                                    <span className="arrow down"></span>
                                </button>
                                {showYearDropdown && (
                                    <div className="dropdown" ref={dropdownYearRef}>
                                        {YEARS.map((y) => (
                                            <div
                                                key={y}
                                                className="dropdown-item"
                                                ref={y === year ? currentYearRef : null}
                                                onClick={() => handleChangeYear(y)}
                                            >
                                                <p className={y === year ? "select-highlight" : ""}>{y}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="days">
                            {days.map((keyDay) => (
                                <p key={keyDay.index}>{keyDay.day}</p>
                            ))}
                        </div>
                    </div>
                    <div className="calendar-body">
                        {calendar?.map((dayValue: MonthDto, index: number) => (
                            <div className={setClassNameDays(dayValue)} key={index} onClick={() => handleSetDate(dayValue)}>{dayValue.day}</div>
                        ))}
                    </div>
                    <div className="calendar-footer">
                        <button className="footer-button cancel" onClick={handleShowCalendar}>{cancelButton}</button>
                        <button className="footer-button submit" onClick={handleSubmitDate}>{submitButton}</button>
                    </div>
                </div>
                </div>
            ) : null}
        </div>
    );
};

export default Calendar;