/* eslint-disable */

export function extractStringValues(obj: { [key: string]: {} | string }): string[] {
    let result: string[] = [];

    for (const key in obj) {
        const value = obj[key];

        if (typeof value === 'string') {
            result.push(value);
        } else if (typeof value === 'object' && value !== null) {
            result = result.concat(extractStringValues(value as { [key: string]: {} | string }));
        }
    }

    return result;
}