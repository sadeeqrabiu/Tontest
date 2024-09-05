import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { SendCoins } from '../wrappers/SendCoins';
import '@ton/test-utils';

describe('SendCoins', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let sendCoins: SandboxContract<SendCoins>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        sendCoins = blockchain.openContract(await SendCoins.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await sendCoins.send(
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
            to: sendCoins.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and sendCoins are ready to use
    });
});
