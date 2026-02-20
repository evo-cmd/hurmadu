import { Request, Response } from 'express';
import { exec } from 'child_process';
import { promisify } from 'util';
import { startDockerContainer, stopDockerContainer } from '../utils/dockerClient';

const execPromise = promisify(exec);

export class DNSController {
    async lookupDomains(req: Request, res: Response) {
        const { domains } = req.body;

        if (!domains || !Array.isArray(domains) || domains.length === 0) {
            return res.status(400).json({ error: 'Invalid input. Please provide one or more domain names.' });
        }

        const results = [];

        try {
            const containerId = await startDockerContainer();

            for (const domain of domains) {
                const command = `dig ${domain}`;
                const { stdout, stderr } = await execPromise(command, { shell: true, cwd: `/var/lib/docker/containers/${containerId}` });

                if (stderr) {
                    results.push({ domain, error: stderr });
                } else {
                    results.push({ domain, output: stdout });
                }
            }

            await stopDockerContainer(containerId);
            return res.json({ results });
        } catch (error) {
            return res.status(500).json({ error: 'An error occurred while processing the request.' });
        }
    }
}