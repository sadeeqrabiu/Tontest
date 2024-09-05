import "@stdlib/deploy";


contract ReceiveCoins with Deployable {

    val: Int as int64;
    init() {
        self.val = 0;
    }

    receive(){

        //receive and empty message,  these are usually simple TON coin transfer to the contract 
        dump("empty message receive");

        //revert the transaction if the balance is growing over 3 TON
        require(myBalance() <= ton("3"), "Balance getting too high"); 
    }

    receive("increment"){

        //
        dump(context().value);
        self.val = self.val + 1;
    }

    receive("refunding increment"){

        //
        dump(context().value);
        self.val = self.val + 1;

        //return excess TOn to the sender 
        self.reply("increment refund".asComment());

    }

    //
    get fun balance(): Int{
        return myBalance();
    }

    get fun val(): Int{
        return self.val;
    }
}
