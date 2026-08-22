export interface Review {
  name: string;
  vehicle?: string;
  rating: number;
  text: string;
}

const normalizeHeader = (header: string) => header.toLowerCase().replace(/[^a-z]/g, "");

const parseCsv = (csv: string): string[][] => {
  const rows: string[][] = [];
  let row: string[] = [];
  let value = "";
  let quoted = false;

  for (let index = 0; index < csv.length; index += 1) {
    const character = csv[index];
    const nextCharacter = csv[index + 1];

    if (character === '"' && quoted && nextCharacter === '"') {
      value += '"';
      index += 1;
    } else if (character === '"') {
      quoted = !quoted;
    } else if (character === "," && !quoted) {
      row.push(value.trim());
      value = "";
    } else if ((character === "\n" || character === "\r") && !quoted) {
      if (character === "\r" && nextCharacter === "\n") index += 1;
      row.push(value.trim());
      if (row.some(Boolean)) rows.push(row);
      row = [];
      value = "";
    } else {
      value += character;
    }
  }

  row.push(value.trim());
  if (row.some(Boolean)) rows.push(row);
  return rows;
};

export const fetchReviews = async (url: string): Promise<Review[]> => {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Unable to load reviews.");

  const rows = parseCsv(await response.text());
  const headers = rows.shift()?.map(normalizeHeader) ?? [];
  const column = (...names: string[]) => names.map(normalizeHeader).map((name) => headers.indexOf(name)).find((index) => index >= 0);
  const nameColumn = column("name", "fullname", "yourname", "customername");
  const textColumn = column("review", "reviewtext", "text", "comment", "comments", "feedback");
  const ratingColumn = column("rating", "stars", "score");
  const serviceColumn = column("service", "servicetype", "vehicle", "category");

  if (nameColumn === undefined || textColumn === undefined) return [];

  return rows
    .map((row) => ({
      name: row[nameColumn] ?? "",
      text: row[textColumn] ?? "",
      rating: Math.min(5, Math.max(1, Number(row[ratingColumn ?? -1]) || 5)),
      vehicle: serviceColumn === undefined ? undefined : row[serviceColumn],
    }))
    .filter((review) => review.name && review.text);
};