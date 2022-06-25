// Deployed on Remix

pragma solidity >=0.7.0 <0.9.0;

contract DeadmanSwitch {
    address owner;
    address payable preSetAddr;
    uint256 numBlocks = 0;
    mapping(address => uint256)balance;
    constructor(address payable _preSetAddr) public{
        owner = msg.sender;
        preSetAddr = _preSetAddr;
    }
    modifier onlyOwner{
        require(msg.sender == owner,"Only Owner");
        _;
    }
    function stillAlive() onlyOwner public{
        numBlocks=0;
    }
    function addBalance() public payable{
        balance[msg.sender] = msg.value;
        //payable(address(this)).transfer(msg.value);
        numBlocks++;
    }
    function transferBalance() public payable{
        preSetAddr.transfer(balance[owner]);
        balance[owner]=0;
    }
    function checkIfOverflow() internal{
        if(numBlocks == 10){
            transferBalance();
        }
    }
    function test() public{
        numBlocks++;
        checkIfOverflow();
    }
}