import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { ReceiveCoins } from '../wrappers/ReceiveCoins';
import '@ton/test-utils';

describe('ReceiveCoins', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let receiveCoins: SandboxContract<ReceiveCoins>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        receiveCoins = blockchain.openContract(await ReceiveCoins.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await receiveCoins.send(
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
            to: receiveCoins.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and receiveCoins are ready to use
    });

    it('should receive TON coins (empty message)', async() => {

        let balance = await receiveCoins.getBalance();
        console.log(`balace before empty message: ${balance}`);


        const sendResult = await receiveCoins.send(
            deployer.getSender(),
            {
                value: toNano('1')
            },
            null
        );

        expect(sendResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: receiveCoins.address,
            success: true
        });

        balance = await receiveCoins.getBalance();
        console.log(`balace after empty message: ${balance}`);


        //check for empty message 
        expect(balance).toBeLessThanOrEqual(toNano('3'));

    });

    it('should handle increment message', async() => {
        let balance = await receiveCoins.getBalance();
        console.log(`balace Before increment message: ${balance}`);


        const sendResult = await receiveCoins.send(
            deployer.getSender(),
            {
                value: toNano('0.05')
            },
            'increment'
        );

        expect(sendResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: receiveCoins.address,
            success: true
        });

        balance = await receiveCoins.getBalance();
        console.log(`blace after increment message: ${balance}`);

    });
});
