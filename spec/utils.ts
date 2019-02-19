export function formatName(first: string, last: string, fn: any) {
    return fn(`${last}, ${first}`);
}

export function formatName2(first: string, last: string, fn: (x: string) => string) {
    return fn(`${last}, ${first}`);
}

