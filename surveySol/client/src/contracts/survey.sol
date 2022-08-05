//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./portal.sol";

contract survey {
    address payable owner;
    address payable admin;
    IERC20 public surveyToken;
    IERC721 public nftToken;
    uint256 public rewardAmount;
    string [] public userCriteria;
    string [] public surveyResponses;
    bool public surveyStatus;
    address payable [] participants;
    portal parentContract;
    bool nftGating;
    uint256 nftAmount;
    
    constructor(address _surveyToken, uint256 _rewardAmount, string [] memory _userCriteria, address payable parentAddress,
     address payable _owner, address payable _admin, bool _nftGating, address nft, uint256 _nftAmount) payable {
        owner = _owner;
        admin = _admin;
        surveyToken = IERC20(_surveyToken);
        rewardAmount = _rewardAmount;
        userCriteria = _userCriteria;
        surveyStatus = true;
        portal parentContract = portal(parentAddress);
        nftGating = _nftGating;
        if (_nftGating) {
            nftToken = IERC721(nft);
            nftAmount = _nftAmount;
        }
    }

    modifier onlyCreator {
        require(msg.sender == owner);
        _;
    }

    modifier onlyAdmin {
        require(msg.sender == admin);
        _;
    }

    modifier isOpen {
        require(surveyStatus == true);
        _; 
    }

    modifier hasFunds {
        require(surveyTokenBalance() >= rewardAmount);
        _;
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

    function setNftGating(bool _nftGating, address _nftToken, uint256 amount) public onlyCreator {
        nftGating = _nftGating;
        if (nftGating) {
            nftToken = IERC721(_nftToken);
            nftAmount = amount;
        }
    }


    function verifyParticipant(address user) public returns (bool) {
        if (nftGating && nftToken.balanceOf(user)<nftAmount) {
            emit userRejected();
            return false;
        } 
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

    function fillSurvey() public isOpen hasFunds {
        require(verifyParticipant(msg.sender) == true);
    }

    function storeResponse(string memory cid) public onlyAdmin {
        require(surveyStatus == true);
        surveyResponses.push(cid);
        emit responseStored(cid);
    }

    function disburseReward(address payable user) public onlyAdmin isOpen hasFunds {
        surveyToken.transfer(user, rewardAmount);
        participants.push(user);
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