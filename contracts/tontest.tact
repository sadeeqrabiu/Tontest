import "@stdlib/deploy";

contract Tontest with Deployable {
    // Empty init() function is present by default in all Tact contracts
    // since v1.3.0, so the following may be omitted:
    //

    s1: String = "hello word, ";
    s2: String = "yes unicode 😀 😅 你好 no escaping"; 

    s3: String;
    s4: String;
    s5: String;
    s6: String;

    init() {

        let i1: Int = -2345;
        let i2: Int = 7250000000; // = ton coin (7.25)


        self.s3 = i1.toString();
        self.s4 = i1.toFloatString(3);
        self.s5 = i2.toCoinsString();

        let sb: StringBuilder = beginString();
        sb.append(self.s1);
        sb.append("Your account balance is: ");
        sb.append(self.s5);

        self.s6 = sb.toString();
    }

    get fun finalString(): String{
        return self.s6;
    }
}
