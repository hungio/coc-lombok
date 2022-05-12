import { window, workspace } from 'coc.nvim';
import got from 'got';
import tunnel from 'tunnel';
import stream from 'stream';
import * as fs from 'fs';
import { promisify } from 'util';

const pipeline = promisify(stream.pipeline);

export async function downloadServer(root: string): Promise<void> {
  let statusItem = window.createStatusBarItem(0, { progress: true });
  statusItem.text = 'Downloading Lombok from projectlombok.org';
  statusItem.show();
  let config = workspace.getConfiguration('http');
  let proxy = config.get<string>('proxy', '');
  let options: any = { responseType: 'buffer', resolveBodyOnly: true };
  if (proxy) {
    let parts = proxy.replace(/^https?:\/\//, '').split(':', 2);
    options.agent = tunnel.httpOverHttp({
      proxy: {
        headers: {},
        host: parts[0],
        port: Number(parts[1])
      }
    });
  }

  let stream = got.stream('https://projectlombok.org/downloads/lombok.jar', options);
  stream.on('downloadProgress', progress => {
    let percent = (progress.percent * 100).toFixed(0)
    statusItem.text = `${percent}% Downloading Lombok from projectlombok.org`
  });
  stream.on('response', _ => {
    statusItem.dispose();
  });
  return pipeline(stream, fs.createWriteStream(root));
}
