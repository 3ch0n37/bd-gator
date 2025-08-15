import type {CommandsRegistry, CommandHandler} from "../types/command_handler";

export const registerCommand = (registry: CommandsRegistry, cmdName: string, handler: CommandHandler) => {
    registry[cmdName] = handler;
}

export const runCommand = async (registry: CommandsRegistry, cmdName: string, ...args: string[]) => {
    const handler = registry[cmdName];
    if (!handler) {
        throw new Error(`Command ${cmdName} not found`);
    }
    await handler(cmdName, ...args);
}

export function printAvailableCommands() {
    console.error("Usage:")
    console.error("  gator register <user_name>");
    console.error("  gator login <user_name>");
    console.error("  gator reset");
    console.error("  gator agg");
    console.error("  gator addfeed <feed_name> <feed_url>");
    console.error();
}
