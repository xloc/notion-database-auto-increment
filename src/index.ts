import { Client } from "@notionhq/client";
import dotenv from "dotenv";

dotenv.config();

function range(start: number, end: number) {
  return Array.from({ length: (end - start) }, (_, k) => k + start);
}

async function createPage(notion: Client, day_number: number) {
  const response = await notion.pages.create({
    parent: {
      database_id: 'b5a825ca9b7d4e07ba956695bc9009c2',
    },
    properties: {
      Day: day_number
    },
  });

  return response;
}

async function main() {
  const notion = new Client({
    auth: process.env.NOTION_TOKEN,
  });

  // const response = await notion.databases.query({
  //   // https://www.notion.so/xloc/b5a825ca9b7d4e07ba956695bc9009c2?v=c08550795fc34cdea21f41984152bb73
  //   // https://www.notion.so/xloc/b5a825ca9b7d4e07ba956695bc9009c2?v=c08550795fc34cdea21f41984152bb73
  //   database_id: "b5a825ca9b7d4e07ba956695bc9009c2",
  // });


  await Promise.all(range(251, 271).map(async (n) => {
    const response = await createPage(notion, n);
    console.log(response.id);
  }));
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
