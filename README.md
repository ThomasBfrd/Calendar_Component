# React Calendar Component

A simple and fully customizable calendar component for React, built with Typescript

![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

## Installation
In your project, just copy and paste this line :
```
npm i @thomasbfrd/calendar
```

## Features

- Modern calendar UI with current-day highlight
- Year & month selection with dropdowns
- Reset button to today's date
- Close button to dismiss the calendar
- Submit button with Callback to handle the selected date via the `onDateChange` prop
- Highly customizable colors


## Usage
You must import the component and the style. <br>
Available props:
```
export interface CalendarProps {
    cancelButton?: string; // Title of the cancel button
    submitButton?: string; // Title of the submit button
    backgroundColor?: string; // Background color of the calendar
    primaryColor?: string; // Primary color in the calendar
    secondaryColor?: string; // Secondary color in the calendar
    tertiaryColor?: string; // Tertiary color in the calendar
    activeColor?: string; // Highlighted color (like the actual or selected date)
    textPrimaryColor?: string; // Primary text color
    textSecondaryColor?: string; // Secondary text color
    hoverColor?: string; // Color for the hover
    onDateChange?: (date: string) => void; // Callback to get back the selected date (date format)
}
```

### Importation :
```
import { Calendar } from "@thomasbfrd/calendar";
import "@thomasbfrd/calendar/dist/calendar.css";
```

Example:
```
<Calendar
    backgroundColor="#ffffff"
    primaryColor="#ef8354"
    secondaryColor="#2d3142"
    tertiaryColor="#ffffff"
    activeColor="#ef8354"
    textPrimaryColor="#ffffff"
    textSecondaryColor="#2d3142"
    hoverColor="#bfc0c0"
    onDateChange={onDateChange}
/>
```

### Customization

You can override the default styles by passing your own color props.

## Demo

![CalendarDemo](https://i.postimg.cc/QdnmtPYd/calendar-demo.png)