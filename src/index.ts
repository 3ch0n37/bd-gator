import { readConfig, setUser } from "./config";
import {printAvailableCommands, registerCommand, runCommand} from "./command/registry";
import {CommandsRegistry} from "./types/command_handler";
import {command_login} from "./command/command_login";
import * as process from "node:process";

function main() {
    const commandsRegistry: CommandsRegistry = {};
    registerCommand(commandsRegistry, 'login', command_login);

    const args = process.argv.slice(2);
    if (args.length === 0) {
        console.error("Error: No command provided.");
        printAvailableCommands();
        process.exit(1);
    }
    const commandName = args[0];
    args.shift();
    if (!(commandName in commandsRegistry)) {
        console.error(`Error: Unknown command "${commandName}".`);
        printAvailableCommands();
        process.exit(1);
    }
    try {
        runCommand(commandsRegistry, commandName, ...args);
    }  catch (e) {
       console.error((e as Error).message);
       process.exit(1)
    }
}

main();
