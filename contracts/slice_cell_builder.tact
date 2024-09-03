import "@stdlib/deploy";

contract SliceCellBuilder with Deployable {
    // Empty init() function is present by default in all Tact contracts
    // since v1.3.0, so the following may be omitted:
    //EQCzrm9hmTrCHQfLGub1pJdiXzsRKSYjY_vMNMaQTBNnaUUy

    storage: Cell;

    init() {

        let coinAdress: Address = address("EQCzrm9hmTrCHQfLGub1pJdiXzsRKSYjY_vMNMaQTBNnaUUy");
        let builder: Builder = beginCell().storeAddress(coinAdress).storeCoins(100000);
        self.storage = builder.asCell();
    }

    get fun coinAddress(): Address {
        let slice: Slice = self.storage.asSlice();
        let cAddress: Address = slice.loadAddress();
        return cAddress;
    }

    get fun coinNumber(): Int{
        let slice: Slice = self.storage.asSlice();
        slice.loadAddress();


        let coins: Int = slice.loadCoins();
        return coins;
    }

    receive("Change Coin Value"){

        let newCoinAddress: Address = address("EQCvxJy4eG8hyHBFsZ7eePxrRsUQSFE_jpptRAYBmcG_DOGS");

        let newToken: Int = 777777;
        let builder: Builder = beginCell().storeAddress(newCoinAddress).storeCoins(newToken);
        self.storage = builder.asCell();
    }
}
