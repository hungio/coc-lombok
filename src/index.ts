'use strict';
import { workspace, commands, window } from "coc.nvim";
import { ExtensionContext } from 'coc.nvim';
import { downloadServer } from './downloader';
import { Commands } from "./commands";
import * as path from 'path';
import * as fs from 'fs';

const VM_ARGS_KEY = "java.jdt.ls.vmargs";

export function activate(context: ExtensionContext) {
    register(context);
}

export function deactivate(context: ExtensionContext) {
    const lombokJarPath = path.join(context.storagePath, "server", "lombok.jar");
    const javaAgentArg = `-javaagent:"${lombokJarPath}"`;
    const workspaceConfig = workspace.getConfiguration();

    let vmArgs: string | undefined = workspaceConfig.get(VM_ARGS_KEY);
    if (vmArgs.includes(javaAgentArg)) {
        vmArgs = vmArgs.replace(/-javaagent:".*"/, '');
        workspaceConfig.update(VM_ARGS_KEY, vmArgs);
        workspace.nvim.command('CocRestart', true);
    }
}

async function register(context: ExtensionContext): Promise<void> {
    const lombokJarPath = path.join(context.storagePath, "server", "lombok.jar");
    const lombokJarDir = path.dirname(lombokJarPath);

    context.subscriptions.push(commands.registerCommand(Commands.DOWNLOAD_LOMBOK, async () => {
        if (!fs.existsSync(lombokJarDir)) {
            fs.mkdirSync(lombokJarDir, { recursive: true });
        }
        try {
            await downloadServer(lombokJarPath);
        } catch (e) {
            context.logger.error(e.message);
            window.showMessage('Update Lombok failed, you can download it at https://projectlombok.org/downloads/lombok.jar');
            fs.rmdirSync(path.dirname(lombokJarPath), { recursive: true });
            return
        }
        workspace.nvim.command('CocRestart', true);
        window.showMessage('Update Lombok successful');
    }));
    if (!fs.existsSync(lombokJarPath)) {
        if (!fs.existsSync(lombokJarDir)) {
            fs.mkdirSync(lombokJarDir, { recursive: true });
        }
        window.showMessage('Lombok not found, downloading...');
        try {
            await downloadServer(lombokJarPath);
        } catch (e) {
            context.logger.error(e.message);
            window.showMessage('Download Lombok failed, you can download it at https://projectlombok.org/downloads/lombok.jar');
            fs.rmdirSync(path.dirname(lombokJarPath), { recursive: true });
            return
        }
        window.showMessage('Lombok downloaded');
    }

    updateVmArgs(lombokJarPath);
}

function updateVmArgs(lombokJarPath: string) {
    const javaAgentArg = `-javaagent:"${lombokJarPath}"`;
    const workspaceConfig = workspace.getConfiguration();

    let vmArgs: string | undefined = workspaceConfig.get(VM_ARGS_KEY);
    if (!vmArgs) {
        vmArgs = javaAgentArg;
    } else if (!vmArgs.match(/-javaagent:".*"/)) {
        vmArgs = vmArgs.trim() + ' ' + javaAgentArg;
    } else if (!vmArgs.includes(javaAgentArg)) {
        vmArgs = vmArgs.replace(/-javaagent:".*"/, javaAgentArg);
    } else {
        return;
    }

    workspaceConfig.update(VM_ARGS_KEY, vmArgs, true);
    workspace.nvim.command('CocRestart', true);
    window.showInformationMessage("If you have any trouble using Lombok, please, make sure your project is using the latest version");
}
