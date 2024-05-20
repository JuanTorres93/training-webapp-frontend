export const dangerousSymbols = ['<', '>', '-', "'", ';'];

export const validateIntegerId = (id) => {
    const defaultErrorMsg = "Not valid id";

    let processedId;
    try {
        processedId = parseInt(id);
    } catch (error) {
        return defaultErrorMsg;
    }

    if (Number.isInteger(processedId)) {
        return processedId;
    }

    return defaultErrorMsg;
};
