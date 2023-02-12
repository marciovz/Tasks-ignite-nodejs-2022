import fs from 'node:fs';
import { parse } from 'csv-parse';

const csvPath = new URL('./tasks.csv', import.meta.url);

async function processFile() {
  const parseChunk = fs
    .createReadStream(csvPath)
    .pipe(
      parse({
        delimiter: ',',
        fromLine: 2,
        skipEmptyLines: true,
      })
    );
  
  for await (const chunk of parseChunk){
    const [title, description] = chunk;

    await fetch('http://localhost:3333/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description })
    });
  }
}

processFile();
