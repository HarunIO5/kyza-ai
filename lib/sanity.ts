import { createClient } from "next-sanity";

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = "production";
const apiVersion = "2022-03-07";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});