import "./Fundraise.sol";

pragma solidity ^0.8.0;
// SPDX-License-Identifier: Unlicensed

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import './TrueToken.sol';

abstract contract Roles{
    address public _owner;
    address private _previousOwner;
    uint256 public _lockTime;
    constructor(){
        _setOwner(msg.sender);
    }
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    function owner() public view virtual returns (address) {
        return _owner;
    }

    modifier onlyOwner() {
        require(owner() == msg.sender, "Ownable: caller is not the owner");
        _;
    }

    function renounceOwnership() public virtual onlyOwner {
        emit OwnershipTransferred(_owner, address(0));
        _owner = address(0);
    }


    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        emit OwnershipTransferred(_owner, newOwner);
        _owner = newOwner;
    }


        //Locks the contract for owner for the amount of time provided
    function lock(uint256 time) public virtual onlyOwner {
        _previousOwner = _owner;
        _owner = address(0);
        _lockTime = time;
        emit OwnershipTransferred(_owner, address(0));
    }

    //Unlocks the contract for owner when _lockTime is exceeds
    function unlock() public virtual {
        require(_previousOwner == msg.sender, "You don't have permission to unlock.");
        require(block.timestamp > _lockTime , "Contract is locked.");
        emit OwnershipTransferred(_owner, _previousOwner);
        _owner = _previousOwner;
    }
     function _setOwner(address newOwner) private {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}


contract FundraiseFactory is Roles, ReentrancyGuard{
    address payable feesAddress;
    address[] private allRaises;

    function deployNewInstance(address _fundRaiser, address _transferAddress, string memory _name, uint256 _goal, address _feeAddress) public{
        FundRaise fundRaise = new FundRaise(_fundRaiser,_transferAddress, _name, _goal, _feeAddress);
        allRaises.push(address(fundRaise));
    }

    function withdrawFees() public onlyOwner{
        uint256 currentContractBalance = address(this).balance;
        feesAddress.transfer(currentContractBalance);

    }
    function updateFeeAddress(address payable newAddress) public onlyOwner{
        feesAddress=newAddress;
    }

    function fundraiseList() public view returns( address[] memory ) {
        return allRaises;
    }

}