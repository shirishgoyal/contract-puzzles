const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game4', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game4');
    const game = await Game.deploy();

    const signer1 = ethers.provider.getSigner(0);

    return { game, signer1 };
  }
  it('should be a winner', async function () {
    const { game, signer1 } = await loadFixture(deployContractAndSetVariables);

    // nested mappings are rough :}
    game.connect(signer1).write(signer1.getAddress());

    await game.connect(signer1).win(signer1.getAddress());

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
