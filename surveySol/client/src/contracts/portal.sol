//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./survey.sol";

contract portal {
    address payable [] public surveyRecord;
    address payable public owner;
    mapping(string => mapping(address => uint)) public tags;
    mapping(string => uint) public validTags;
    uint256 public portalFees;

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    constructor() payable {
        owner = payable(msg.sender);
    }

    receive() external payable {}



    function kill() public onlyOwner {
        selfdestruct(owner);
    }

    function addUser(string [] memory userTags, bool [] memory set, address user) public onlyOwner {
        for (uint i = 0; i < userTags.length; i++) tags[userTags[i]][user] = set[i] == true ? 1 : 0;
    }

    function addTag(string memory tag) public onlyOwner {
        validTags[tag] = 1;
    }

    function removeTag(string memory tag) public onlyOwner {
        validTags[tag] = 0;
    }

    function setFees(uint256 _portalFees) public onlyOwner {
        portalFees = _portalFees;
    }

    function createSurvey(address _surveyToken, uint256 _rewardAmount, string [] memory _userCriteria) public payable returns (address) {
        require(msg.value == portalFees);
        address newSurvey = address(new survey(_surveyToken, _rewardAmount, _userCriteria, payable(address(this)), payable(msg.sender), owner));
        surveyRecord.push(payable(newSurvey));
        emit surveyCreated(payable(newSurvey));
        return newSurvey;
    }

    event surveyCreated(address payable survey);

}