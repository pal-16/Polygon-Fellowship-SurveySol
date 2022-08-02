//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./portal.sol";

contract survey {
    address payable owner;
    address payable admin;
    IERC20 public surveyToken;
    uint256 public rewardAmount;
    string [] public userCriteria;
    string [] public surveyResponses;
    bool public surveyStatus;
    portal parentContract;
    


    constructor(address _surveyToken, uint256 _rewardAmount, string [] memory _userCriteria, address payable parentAddress,
     address payable _owner, address payable _admin) payable {
        owner = _owner;
        admin = _admin;
        surveyToken = IERC20(_surveyToken);
        rewardAmount = _rewardAmount;
        userCriteria = _userCriteria;
        surveyStatus = true;
        portal parentContract = portal(parentAddress);
        
    }

    modifier onlyCreator {
        require(msg.sender == owner);
        _;
    }

    modifier onlyAdmin {
        require(msg.sender == admin);
    }

    function setRewardAmount(uint256 _rewardAmount) public onlyCreator {
        rewardAmount = _rewardAmount;
    }

    function setSurveyToken(address token) public onlyCreator {
        surveyToken = IERC20(token);
        emit tokenUpdated(token); 
    }

    function addCriteria(string memory tag) public onlyCreator {
        userCriteria.push(tag);
        emit criteriaUpdated(userCriteria);
    }

    function modifyCriteria(string [] memory _userCriteria) public onlyCreator {
        userCriteria = _userCriteria;
        emit criteriaUpdated(userCriteria);
    }

    function depositToken(uint256 amount) public payable {
        surveyToken.transferFrom(msg.sender, address(this), amount);
    }

    function withdrawToken(uint256 amount) public payable onlyCreator {
        surveyToken.transfer(owner, amount);
    }

    function surveyTokenBalance() public view returns (uint256) {
        return surveyToken.balanceOf(address(this));
    }

    function balance() public view returns (uint256) {
        return address(this).balance;
    }

    function kill() public onlyCreator {
        selfdestruct(owner);
    }

    receive() external payable {}

    function withdraw() public payable onlyCreator {
        owner.transfer(address(this).balance);
    }

    function closeSurvey() public onlyCreator {
        surveyStatus = false;
        emit statusUpdated(surveyStatus);
    }

    function openSurvey() public onlyCreator {
        surveyStatus = true;
        emit statusUpdated(surveyStatus);
    }

    function verifyParticipant(address user) public returns (bool) {
        for (uint i = 0; i < userCriteria.length; i++) {
            uint p = parentContract.tags(userCriteria[0],user);
            if (p == 0) {
                emit userRejected();
                return false;
            }
        }
        emit userEligible();            
        return true;        
    }

    function fillSurvey() public {
        require(surveyStatus == true);
        require(verifyParticipant(msg.sender) == true);
        require(surveyTokenBalance() >= rewardAmount);
    }

    function storeResponse(string memory cid) public onlyAdmin {
        require(surveyStatus == true);
        surveyResponses.push(cid);
        emit responseStored(cid);
    }

    function disburseReward(address payable user) public onlyAdmin {
        require(surveyStatus == true);
        surveyToken.transfer(user, rewardAmount);
        uint b = surveyTokenBalance();
        emit participantPaid(user, rewardAmount);
        if (b<rewardAmount) {
            surveyStatus = false;
            emit statusUpdated(surveyStatus);
        }
    }

    event rewardUpdated(uint256 rewardAmount);
    event statusUpdated(bool status);
    event criteriaUpdated(string [] criteria);
    event tokenUpdated(address token);
    event userEligible();
    event userRejected();
    event responseStored(string cid);
    event participantPaid(address payable user, uint256 reward);

}