import Replicate from "replicate";

console.log("REPLICATE KEY")
console.log(process.env.REPLICATE_API_TOKEN)

export const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});