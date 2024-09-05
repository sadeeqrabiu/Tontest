import "@stdlib/deploy";



message Withdraw {
    amount: Int as coins;
}

contract SendCoins with Deployable {

    const MinTonForStorage: Int = ton("0.01");
    deploer: Address;
   
    init() {
        self.deployer = sender();
    }


    //accept incoming TON transfer 
    receive(){

    }

    //
    receive("withdraw all"){
        require(sender() == self.deployer, "Only the deployer is allow to withdraw");
        send(
            sendParameters{
              to: sender(),
              bounced: true,
              value: 0,
              mode: SendRemainingBalance + SendIgnoreErrors  
            }
        );
        // send(
        //     sendParameters{
        //         to: sender(),
        //         bounce: true,
        //         value: 0,
        //         mode: SendRemainingBalance + SendIgnoreErrors
        //     }
    
        // );
    }

   
    //
     receive("withdraw safe"){
        require(sender() == self.deployer, "Only the deploer is allow to withdraw");
        // let amount: Int = min(msg.amount, myBalance());
        send(
            sendParameters{
                to: sender(),
                bounce: true,
                value: myBalance() - context().value - self.MinTonForStorage,
                mode: SendRemainingValue + SendIgnoreErrors
            }
    
        );
    }

     //withdraw specific amout and and leave 0.01 for storage rent 

    receive(msg: Withdraw){
        require(sender() == self.deployer, "Only the deploer is allow to withdraw");
        let amount: Int = min(msg.amount, myBalance() - context().value -  self.MinTonForStorage);
        required(amount > 0, "insufficient Balance")
        send(
            sendParameters{
                to: sender(),
                bounce: true,
                value: amount,
                mode: SendRemainingValue + SendIgnoreErrors
            }
    
        );
    }

    get fun balance(): String {
        return myBalance().toCoinsString();
    }
}
