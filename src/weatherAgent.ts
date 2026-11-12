import { ToolLoopAgent, tool } from "ai";
import { ollama } from "ai-sdk-ollama";
// import { yourProvider } from "your-custom-provider";
import { z } from "zod";

export const rawTools = {
    getWeather: async (location: string) => {
        console.log("Getting weather in Fahrenheit");
        return {
            location,
            temperature: 72 + Math.floor(Math.random() * 21) - 10,
        };
    },
    toCelsius: async (temperature:number) => {
        const celsius = Math.round((temperature - 32) * (5 / 9));
        console.log("conversion done", { temperature, celsius });
        return { celsius };
    },
};

const weatherAgent = new ToolLoopAgent({
    model: ollama("gemma4"),
    tools: {
        weather: tool({
            description: "Get the weather in a location (in Fahrenheit)",
            inputSchema: z.object({
                location: z
                    .string()
                    .describe("The location to get the weather for"),
            }),
            execute: async ({ location }) => rawTools.getWeather(location),
        }),
        convertFahrenheitToCelsius: tool({
            description: "Convert temperature from Fahrenheit to Celsius",
            inputSchema: z.object({
                temperature: z.number().describe("Temperature in Fahrenheit"),
            }),
            execute: async ({ temperature }) => rawTools.toCelsius(temperature),
        }),
    },
});

export async function callMe(
    prompt: string = "What is the weather in San Francisco in celsius?",
): Promise<any> {
    // TODO: tighten the spec
    const result = await weatherAgent.generate({
        prompt,
    });

    console.log(result.text); // agent's final answer
    console.log(result.steps.length + " steps."); // steps taken by the agent
    return result;
}
