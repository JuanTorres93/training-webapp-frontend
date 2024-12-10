export const calculateTicks = (ref, stateSetFunctionYAxis, stateSetFunctionXAxis) => {
    // IMPORTANT: This function must be the callback of a useEffect hook (with an empty dependency array?)
    // IMPORTANT: a useRef hook must also be used

    return () => {
        // Function to calculate the number of ticks based on the container's height
        const calculateYTicks = (height) => {
            return Math.max(2, Math.floor(height / 75)); // Add tick every 75px (Nivo may not respect this)
        };

        const calculateXTicks = (width) => {
            return Math.max(2, Math.floor(width / 140)); // Add tick every 75px (Nivo may not respect this)
        };

        const handleResize = (entries) => {
            for (let entry of entries) {
                const { height, width } = entry.contentRect;
                stateSetFunctionYAxis(calculateYTicks(height));
                stateSetFunctionXAxis(calculateXTicks(width));
            }
        };

        // Create a ResizeObserver to observe changes in the container's dimensions
        const resizeObserver = new ResizeObserver(handleResize);

        // Observe container only if it exists
        if (ref.current) {
            resizeObserver.observe(ref.current);
        }

        // Clean up when component unmounts
        return () => resizeObserver.disconnect();
    }
};