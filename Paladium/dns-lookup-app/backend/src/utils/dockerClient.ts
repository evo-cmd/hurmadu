import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

export const runDigCommand = async (domains: string[]): Promise<string[]> => {
    const results: string[] = [];

    for (const domain of domains) {
        try {
            const { stdout } = await execPromise(`docker run --rm --network host infoblox/dig ${domain}`);
            results.push(formatDigOutput(stdout));
        } catch (error) {
            results.push(`Error executing dig for ${domain}: ${error.message}`);
        }
    }

    return results;
};

const formatDigOutput = (output: string): string => {
    // Format the output as needed
    return output.trim();
};