import type {CommandHandler} from "../types/command_handler";
import {setUser} from "../config";
import {getUserByName} from "../lib/db/queries/users";

export const command_login: CommandHandler = async (cmdName: string, ...args: string[]) => {
    if (!args.length) {
        throw new Error("User name is required");
    }
    if (args.length > 1) {
        throw new Error("Too many arguments");
    }
    const userName = args[0];
    const user = await getUserByName(userName);
    if (!user) {
        throw new Error("User not found");
    }
    setUser(userName);
    console.log(`Successfully logged in as ${args[0]}.`);
}
