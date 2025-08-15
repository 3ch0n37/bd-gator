import type {UserRecord} from '../lib/db/schema';

export type CommandHandler = (cmdName: string, ...args: string[]) => Promise<void>

export type CommandsRegistry = Record<string, CommandHandler>;

export type UserCommandHandler = (
    cmdName: string,
    user: UserRecord,
    ...args: string[]
) => Promise<void> | void;
