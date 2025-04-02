function formatExerciseTime(milliseconds: number): string {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
        const parts = [];
        if (hours > 0) parts.push(`${hours} h`);
        if (minutes > 0) parts.push(`${minutes} min`);
        if (seconds > 0) parts.push(`${seconds} s`);
        return parts.join(" ");
    }

    return seconds > 0 ? `${minutes} min ${seconds} s` : `${minutes} min`;
}

export default formatExerciseTime;
