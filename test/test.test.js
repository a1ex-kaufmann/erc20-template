let accounts;

const ERC20Basic = artifacts.require("./ERC20Basic");

describe('ERC20Test', function () {
    beforeEach(async () => {
        accounts = await web3.eth.getAccounts();
    });

  it('should put 10000 ERC20Basic in the first account', async () => {
    const ERC20BasicInstance = await ERC20Basic.deployed(10000);
    const balance = await ERC20BasicInstance.balanceOf.call(accounts[0]);

    assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");
  });

  it('should transfer token correctly', async () => {
    const ERC20BasicInstance = await ERC20Basic.deployed(10000);

    // Setup 2 accounts.
    const accountOne = accounts[0];
    const accountTwo = accounts[1];

    // Get initial balances of first and second account.
    const accountOneStartingBalance = (await ERC20BasicInstance.balanceOf.call(accountOne)).toNumber();
    const accountTwoStartingBalance = (await ERC20BasicInstance.balanceOf.call(accountTwo)).toNumber();

    // Make transaction from first account to second.
    const amount = 10;
    await ERC20BasicInstance.transfer(accountTwo, amount, { from: accountOne });

    // Get balances of first and second account after the transactions.
    const accountOneEndingBalance = (await ERC20BasicInstance.balanceOf.call(accountOne)).toNumber();
    const accountTwoEndingBalance = (await ERC20BasicInstance.balanceOf.call(accountTwo)).toNumber();

    assert.equal(accountOneEndingBalance, accountOneStartingBalance - amount, "Amount wasn't correctly taken from the sender");
    assert.equal(accountTwoEndingBalance, accountTwoStartingBalance + amount, "Amount wasn't correctly sent to the receiver");
  });
});
