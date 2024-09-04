import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { MapsStructMessages } from '../wrappers/MapsStructMessages';
import '@ton/test-utils';

describe('MapsStructMessages', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let mapsStructMessages: SandboxContract<MapsStructMessages>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        mapsStructMessages = blockchain.openContract(await MapsStructMessages.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await mapsStructMessages.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: mapsStructMessages.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and mapsStructMessages are ready to use
    });
});
