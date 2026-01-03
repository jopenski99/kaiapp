 export function normalizeCase(data: string): string {
    let word = data
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
 }

 