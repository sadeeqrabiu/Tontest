import { toNano } from '@ton/core';
import { Tontest } from '../wrappers/Tontest';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const tontest = provider.open(await Tontest.fromInit());

    await tontest.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(tontest.address);

    // run methods on `tontest`
}
