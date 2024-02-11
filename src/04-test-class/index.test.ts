// Uncomment the code below and write your tests
import {
  BankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  getBankAccount,
} from '.';

jest.setTimeout(30000);

describe('BankAccount', () => {
  const initialBalance = 500;
  const bankAccount1 = getBankAccount(initialBalance);
  const bankAccount2 = getBankAccount(initialBalance);

  async function getNumberOutOfFetchBalance(
    bankAccount: BankAccount,
  ): Promise<number> {
    const result: number | null = await bankAccount.fetchBalance();
    return result == null ? getNumberOutOfFetchBalance(bankAccount) : result;
  }
  test('should create account with initial balance', () => {
    expect(bankAccount1).toEqual(new BankAccount(initialBalance));
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => {
      bankAccount1.withdraw(initialBalance + 1);
    }).toThrow(new InsufficientFundsError(initialBalance));
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => {
      bankAccount1.transfer(initialBalance + 1, bankAccount2);
    }).toThrow();
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => {
      bankAccount1.transfer(initialBalance, bankAccount1);
    }).toThrow();
  });

  test('should deposit money', () => {
    expect(bankAccount1.deposit(initialBalance).getBalance()).toBe(
      initialBalance * 2,
    );
  });

  test('should withdraw money', () => {
    //we added another 500 to bankAccount1 on the previous step
    expect(bankAccount1.withdraw(initialBalance).getBalance()).toBe(
      initialBalance,
    );
  });

  test('should transfer money', () => {
    expect(
      bankAccount1.transfer(initialBalance, bankAccount2).getBalance(),
    ).toBe(0);
    expect(bankAccount2.getBalance()).toBe(initialBalance * 2);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    expect(typeof (await getNumberOutOfFetchBalance(bankAccount1))).toBe(
      'number',
    );
  });

  test('should set new balance if fetchBalance returned number', async () => {
    //synchronizeBalance can't make balance more than 100
    const oldBalance: number = 150;
    async function waitForSynchronizeBalance(): Promise<void> {
      try {
        await getBankAccount(oldBalance).synchronizeBalance();
      } catch {
        await waitForSynchronizeBalance();
      }
    }
    await waitForSynchronizeBalance();

    expect(bankAccount1.getBalance()).not.toBe(oldBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    async function waitForSinchronizeFail() {
      try {
        await bankAccount1.synchronizeBalance();
        await waitForSinchronizeFail();
      } catch (error) {
        throw error;
      }
    }
    expect(async () => {
      await waitForSinchronizeFail();
    }).rejects.toThrow(new SynchronizationFailedError());
  });
});
