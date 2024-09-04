import { toNano } from '@ton/core';
import { MapsStructMessages } from '../wrappers/MapsStructMessages';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const mapsStructMessages = provider.open(await MapsStructMessages.fromInit());

    await mapsStructMessages.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(mapsStructMessages.address);

    // run methods on `mapsStructMessages`
}
