import type {CommandHandler} from "../types/command_handler";
import {setUser} from "../config";

export const command_login: CommandHandler = (cmdName: string, ...args: string[]) => {
    if (!args.length) {
        throw new Error("User name is required");
    }
    if (args.length > 1) {
        throw new Error("Too many arguments");
    }
    setUser(args[0]);
    console.log(`Successfully logged in as ${args[0]}.`);
}
