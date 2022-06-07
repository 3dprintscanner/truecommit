
pragma solidity ^0.8.0;
// SPDX-License-Identifier: Unlicensed
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import './TrueToken.sol';

contract FundRaise is Ownable {

    IERC20 public token;
    address public fundRaiser;
    address public transferAddress;
    address private feeAddress;
    string public name;
    uint256 public goal;
    uint256 public minumumContribution = 0.01 ether;
    uint256 public currentTotal = 0;
    uint256 public txFees = 0;
    uint256 public fee = 0.001 ether;
    constructor(address _fundRaiser, address _transferAddress, string memory _name, uint256 _goal, address _feeAddress){
        token = new TrueToken(address(this), _name);
        fundRaiser = _fundRaiser;
        transferAddress = _transferAddress;
        name = _name;
        goal = _goal;
        feeAddress = _feeAddress;
    }


    function contribute() public payable{
        // require(msg.value >= minumumContribution, "Requires more than the minimum contribution");
        // require(msg.value >= fee, "Insufficient to cover fees");
        uint256 messageValue = msg.value;
        token.transfer(msg.sender, messageValue);
    }

    receive() external payable{

    }

    function GetTokenAddress() public view returns( address ) {
        return address(token);
    }


}