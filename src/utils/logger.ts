export function logTool(name: string, input: unknown) {
  console.log(`\n Tool Invoked: ${name}`);
  console.log("Input:", JSON.stringify(input, null, 2));
}
