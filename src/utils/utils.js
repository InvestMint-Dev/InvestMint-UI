export const handleKeyDown = (event) => {
    // Check if the Enter key is pressed
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent the default action (new line)
    }
};