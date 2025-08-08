import type {CommandsRegistry, CommandHandler} from "../types/command_handler";

export const registerCommand = (registry: CommandsRegistry, cmdName: string, handler: CommandHandler)=> {
    registry[cmdName] = handler;
}

export const runCommand = (registry: CommandsRegistry, cmdName: string, ...args: string[])=> {
    const handler = registry[cmdName];
    if (!handler) {
        throw new Error(`Command ${cmdName} not found`);
    }
    handler(cmdName, ...args);
}

export function printAvailableCommands() {
    console.error("Usage:")
    console.error("  gator login <user_name>");
    console.error();
}
