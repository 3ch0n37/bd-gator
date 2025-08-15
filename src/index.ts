import {printAvailableCommands, registerCommand, runCommand} from "./command/registry";
import {CommandsRegistry} from "./types/command_handler";
import {command_login} from "./command/command_login";
import * as process from "node:process";
import {command_register} from "./command/command_register";
import {command_reset} from "./command/command_reset";
import {command_users} from "./command/command_users";
import {command_agg} from "./command/command_agg";
import {command_addFeed} from "./command/command_addfeed";

async function main() {
    const commandsRegistry: CommandsRegistry = {};
    registerCommand(commandsRegistry, 'login', command_login);
    registerCommand(commandsRegistry, 'register', command_register);
    registerCommand(commandsRegistry, 'reset', command_reset);
    registerCommand(commandsRegistry, 'users', command_users);
    registerCommand(commandsRegistry, 'agg', command_agg);
    registerCommand(commandsRegistry, 'addfeed', command_addFeed);

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
        await runCommand(commandsRegistry, commandName, ...args);
    } catch (e) {
        console.error((e as Error).message);
        process.exit(1)
    }
    process.exit(0);
}

main();
