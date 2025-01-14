export const calculateTicks = (
    ref,
    stateSetFunctionYAxis,
    stateSetFunctionXAxis,
    totalValues = null,
) => {
    // IMPORTANT: This function must be the callback of a useEffect hook (with an empty dependency array?)
    // IMPORTANT: a useRef hook must also be used

    return () => {
        // Function to calculate the number of ticks based on the container's height
        const calculateYTicks = (height) => {
            const calculatedTicks = Math.max(2, Math.floor(height / 75)); // Add tick every 75px (Nivo may not respect this)

            if (totalValues) {
                return Math.min(totalValues, calculatedTicks);
            }

            return calculatedTicks;
        };

        const calculateXTicks = (width) => {
            const calculatedTicks = Math.max(2, Math.floor(width / 140)); // Add tick every 75px (Nivo may not respect this)

            if (totalValues) {
                return Math.min(totalValues, calculatedTicks);
            }

            return calculatedTicks;
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