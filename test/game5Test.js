const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game5', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game5');
    const game = await Game.deploy();

    return { game };
  }
  it('should be a winner', async function () {
    count = 0;
    while (count < 150) {
      signer = ethers.provider.getSigner(count);
      address = await signer.getAddress();
      thresh = Number('0x00F');
      if (Number(address.slice(0, 5)) <= thresh) {
        console.log(`${count} => ${address} => ${Number(address.slice(0, 4))}`);
        break;
      }
      count++;
    }

    const { game } = await loadFixture(deployContractAndSetVariables);

    // good luck

    await game.connect(signer).win();

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
