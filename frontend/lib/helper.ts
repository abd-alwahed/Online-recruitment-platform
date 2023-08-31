export interface Response<T> {
    data: T;
}

type Attributes = {
    [key: string]: any;
};

type ProcessedObject = {
    [key: string]: any;
};

export const responseParser = <T>(response: Response<T>): ProcessedObject | ProcessedObject[] => {
    if (!response.data) return response;
    if (!Array.isArray(response.data)) {
        const { id, attributes } = response.data as unknown as { id: string; attributes: Attributes };
        return { id, ...attributes };
    }
    return response.data.map(({ id, attributes }: { id: string; attributes: Attributes }) => {
        const returnedObject: ProcessedObject = { id };
        for (const attributeName in attributes) {
            if (attributes.hasOwnProperty(attributeName)) {
                const attribute = attributes[attributeName];
                const processedAttribute = responseParser(attribute);
                returnedObject[attributeName] = processedAttribute;
            }
        }
        return returnedObject;
    });
}; 2