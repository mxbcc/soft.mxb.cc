export const buildUrl = (url: string, query: any) => {
    const queryString = url.split('?')[1] ?? '';
    const keys = Object.keys(query)
        .filter(key => !queryString.includes(`${key}=`))
        .filter(key => query[key]);

    let result: string = url;
    if (queryString) {
        keys.forEach(key => result += `&${key}=${query[key]}`);
    } else {
        keys.forEach((key, index) => result += `${index === 0 ? '?' : '&'}${key}=${query[key]}`);
    }

    return result;
}
