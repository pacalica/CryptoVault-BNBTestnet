// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CryptoVault {
    struct Deposit {
        uint256 amount;
        uint256 startTime;
        uint256 duration;
        uint256 paid;
    }

    mapping(address => Deposit) public deposits;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function deposit(uint256 durationSeconds) external payable {
        require(msg.value > 0, "Must send BNB");
        require(deposits[msg.sender].amount == 0, "Already deposited");

        deposits[msg.sender] = Deposit({
            amount: msg.value,
            startTime: block.timestamp,
            duration: durationSeconds,
            paid: 0
        });
    }

    function withdrawPayout() external {
        Deposit storage d = deposits[msg.sender];
        require(d.amount > 0, "No deposit found");

        uint256 elapsed = block.timestamp - d.startTime;
        uint256 totalPayout = (d.amount * elapsed) / d.duration;

        if (totalPayout > d.amount) {
            totalPayout = d.amount;
        }

        uint256 toPay = totalPayout - d.paid;
        require(toPay > 0, "No payout available");

        d.paid = totalPayout;
        payable(msg.sender).transfer(toPay);
    }

    function earlyWithdraw() external {
        Deposit storage d = deposits[msg.sender];
        require(d.amount > 0, "No deposit found");
        require(block.timestamp < d.startTime + d.duration, "Already matured");

        uint256 penalty = (d.amount * 10) / 100;
        uint256 refund = d.amount - penalty;

        delete deposits[msg.sender];
        payable(msg.sender).transfer(refund);
    }
}
