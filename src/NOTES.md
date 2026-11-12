# Agentic Tooling

This is based on the course by Joe Maddalone, as seen [here](https://www.youtube.com/watch?v=jDwwNq11Nuo&list=PLKiuVKZics1e56DnN0opCpH2U4DaX_dGZ).
One difference is that I use `ai-sdk-ollama` package, instead of his `@ai-sdk/openai`. This is slightly simpler since I don't have to check that the ollama server is running each time. Todo: check if there is a speed advantage the other way? 

## Initialise project using git-bash
```
mkdir local-ts-agent && cd local-ts-agent
npm init -y
npm install typescript @types/node tsx --save-dev
npm install ai ai-sdk-ollama zod
npx tsc --init
```

Note: there was an issue with esbuild Node script that needed approval. Also, original instructions required an npm package called `@ai-sdk/ollama` which did not exist (at the time?)

Instructions said to run from bash with: `npx tsx src/index.ts`. For Windows this fails under Powershell due to script restrictions, but works okay with the regular command-prompt and with git-bash.

That said, there are much quicker ways to read the contents of a folder! But still, automation etc...

## TODO:
I feel that this approach for the current use-cases is clunky. I'd prefer to use a systemOne model instead to check if a tool is needed. Next task is to call the tools directly based on a system1 result, rather than have the LLM do the calling. That should be quicker but require a lot more coding.
