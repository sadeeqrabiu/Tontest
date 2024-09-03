import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { SliceCellBuilder } from '../wrappers/SliceCellBuilder';
import '@ton/test-utils';
import { sign } from 'crypto';

describe('SliceCellBuilder', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let sliceCellBuilder: SandboxContract<SliceCellBuilder>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        sliceCellBuilder = blockchain.openContract(await SliceCellBuilder.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await sliceCellBuilder.send(
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
            to: sliceCellBuilder.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and sliceCellBuilder are ready to use
    });

    it('should chnage the values', async () => {
        const coinNumberBefore = await sliceCellBuilder.getCoinNumber();
        const coinAddressBefore = await sliceCellBuilder.getCoinAddress();

        console.log("Coin number Before: ", coinNumberBefore);
        console.log("coin Address Before:", coinAddressBefore);

        const changeValueResult = await sliceCellBuilder.send(
            deployer.getSender(),
            {
                value: toNano('0.05')
            },
            "Change Coin Value"
        );

        const coinAddressAfter = await sliceCellBuilder.getCoinAddress();
        const coinNumberAfter = await sliceCellBuilder.getCoinNumber();

        console.log("Coin number Before: ", coinNumberAfter);
        console.log("coin Address Before:", coinAddressAfter);


        expect(coinAddressBefore).not.toEqualAddress(coinAddressAfter);
        expect(coinNumberBefore).not.toEqual(coinNumberAfter);
    });
});
