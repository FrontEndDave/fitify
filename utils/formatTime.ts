const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    const parts: string[] = [];

    const getPolishTimeUnit = (value: number, unit: "hour" | "minute") => {
        if (value === 1) return unit === "hour" ? "h" : "m";
        if (value >= 2 && value <= 4) return unit === "hour" ? "h" : "m";
        return unit === "hour" ? "h" : "m";
    };

    if (hours > 0) {
        parts.push(`${hours} ${getPolishTimeUnit(hours, "hour")}`);
    }

    if (remainingMinutes > 0 || parts.length === 0) {
        parts.push(`${remainingMinutes} ${getPolishTimeUnit(remainingMinutes, "minute")}`);
    }

    return parts.join(" ");
};

export default formatTime;
