import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

export const runDigCommand = async (domains: string[]): Promise<string[]> => {
    const results: string[] = [];

    for (const domain of domains) {
        try {
            // Execute the bundled `check-dns` CLI inside the running dns container
            const { stdout } = await execPromise(`docker exec -i paladium_dns check-dns ${domain}`);
            results.push(formatDigOutput(stdout));
        } catch (error) {
            if (error instanceof Error) {
                results.push(`Error executing dig for ${domain}: ${error.message}`);
            } else {
                results.push(`Error executing dig for ${domain}: ${String(error)}`);
            }
        }
    }

    return results;
};


const formatDigOutput = (output: string): string => {
    // Format the output as needed
    return output.trim();
};

// Dummy implementations for start/stop Docker container
// Replace with actual logic as needed
export const startDockerContainer = async (): Promise<string> => {
    try {
        // Try to bring up the dns-container via docker-compose (assumes docker-compose is available)
        const composeFile = `${__dirname}/../../../docker-compose.yml`;
        const { stdout } = await execPromise(`docker-compose -f ${composeFile} up -d dns-container`);
        // Optionally parse stdout to extract container id; return service name as identifier
        return 'paladium_dns';
    } catch (err) {
        if (err instanceof Error) throw err;
        throw new Error(String(err));
    }
};

export const stopDockerContainer = async (containerId: string): Promise<void> => {
    try {
        // Stop using docker-compose down for the single service
        const composeFile = `${__dirname}/../../../docker-compose.yml`;
        await execPromise(`docker-compose -f ${composeFile} stop dns-container`);
    } catch (err) {
        // swallow errors or rethrow as needed
        if (err instanceof Error) throw err;
        throw new Error(String(err));
    }
};