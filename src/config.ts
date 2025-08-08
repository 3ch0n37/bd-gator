import fs from "fs";
import os from "os";
import path from "path";
import type {Config} from "./types/config";

const getConfigFilePath = (): string => {
    return path.join(os.homedir(), ".gatorconfig.json");
}

const writeConfig = (config: Config) => {
    const configFilePath = getConfigFilePath();

    const rawConfig = {
        db_url: config.dbUrl,
        current_user_name: config.currentUserName,
    }

    const stringifiedConfig = JSON.stringify(rawConfig);
    fs.writeFileSync(configFilePath, stringifiedConfig);
}

const validateConfig = (rawConfig: any): Config => {

    if (!rawConfig.db_url || typeof rawConfig.db_url !== "string") {
        throw new Error("db_url is required in config file");
    }
    if (!rawConfig.current_user_name || typeof rawConfig.current_user_name !== "string") {
        throw new Error("current_user_name is required in config file");
    }
    return {
        dbUrl: rawConfig.db_url,
        currentUserName: rawConfig.current_user_name,
    } as Config;
}

export function readConfig(): Config {
    const configFilePath = getConfigFilePath();
    const rawConfig = fs.readFileSync(configFilePath, "utf-8");
    const parsedConfig = JSON.parse(rawConfig);
    return validateConfig(parsedConfig);
}

export function setUser(userName: string) {
    const config = readConfig();
    config.currentUserName = userName;
    writeConfig(config);
}
