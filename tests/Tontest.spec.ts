import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { Tontest } from '../wrappers/Tontest';
import '@ton/test-utils';

describe('Tontest', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let tontest: SandboxContract<Tontest>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        tontest = blockchain.openContract(await Tontest.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await tontest.send(
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
            to: tontest.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and tontest are ready to use

        // const finalString = await strings.getFinalString();
        const finalString = await tontest.getFinalString();
        console.log("final String:", finalString);

    });
});
