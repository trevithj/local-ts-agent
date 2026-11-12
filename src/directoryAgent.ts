import { ollama } from "ai-sdk-ollama";
import { ToolLoopAgent, tool } from "ai";
import { z } from "zod";
import { execSync } from "child_process";

function getDirectoryCommand(path:string):string {
    if(process.platform === "win32") {
        return `dir ${path}`;
    }
    return `ls -l ${path}`;
}

// Define a tool the local model can use on your Windows system
const checkDirectoryTool = tool({
    description:
        "List the files in the given directory of the current project.",
    inputSchema: z.object({
        path: z
            .string()
            .describe("The relative path to the folder we want to read."),
    }),
    execute: async ({ path }) => {
        const cmd = getDirectoryCommand(path);
        console.log(process.platform, cmd);
        const output = execSync(cmd, { encoding: "utf-8"});
        return { output };
    },
});

const directoryAgent = new ToolLoopAgent({
    model: ollama("gemma4"),
    instructions:
        "You are a helpful Windows system automation assistant. Use your tools to fulfill requests.",
    tools: {
        checkDirectory: checkDirectoryTool,
        checkFolder: checkDirectoryTool,
    },
});

export async function callMe(
    prompt: string = "Check what files are in my current folder right now.",
): Promise<any> {
    // TODO: tighten the spec
    const result = await directoryAgent.generate({
        prompt,
    });

    console.log(result.text); // agent's final answer
    console.log(result.steps.length + " steps."); // steps taken by the agent
    return result;
}
