export function parseJwt(token: string) {
    return JSON.parse(Buffer.from((token.split('.')[1] as string), 'base64').toString());
}