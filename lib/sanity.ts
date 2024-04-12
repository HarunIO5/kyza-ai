import { createClient } from "next-sanity";

// const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = "production";
const apiVersion = "2022-03-07";

// console.log('SANITY')
// console.log(projectId)

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset,
  apiVersion,
  useCdn: false,
});