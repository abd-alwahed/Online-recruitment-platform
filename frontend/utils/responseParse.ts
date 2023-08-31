export interface Response<T> {
    data: T;
}

type Attributes = {
    [key: string]: any;
};

type ProcessedObject = {
    [key: string]: any;
};

const getReturnedObject = (attributes, id) => {
    const returnedObject: ProcessedObject = { id };
    for (const attributeName in attributes) {
        if (attributes.hasOwnProperty(attributeName)) {
            let attribute = attributes[attributeName];
            const processedAttribute = responseParser(attribute);
            returnedObject[attributeName] = processedAttribute;
        }
    }
    return { id, ...(returnedObject as any) };
}   

export const responseParser = <T>(response: Response<T>): ProcessedObject | ProcessedObject[] => {
    if (!response?.data) return response;

    if (!Array.isArray(response.data)) {        
        const { id, attributes } = response.data as unknown as { id: string; attributes: Attributes };
        return getReturnedObject(attributes, id);
    }
    return response.data.map(({ id, attributes }: { id: string; attributes: Attributes }) => getReturnedObject(attributes, id));
};
