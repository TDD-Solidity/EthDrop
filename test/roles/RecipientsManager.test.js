const RecipientsManager = artifacts.require('./RecipientsManager.sol')
const truffleAssert = require('truffle-assertions');

contract('RecipientsManager', (accounts) => {

    let contract;

    let [ceo, cfo, coo, contractOwner, recipient1_group1, recipient2_group1, recipient1_group2, recipient2_group2,
        admin1_group1, admin2_group1, admin1_group2] = accounts;

    beforeEach(async () => {
        contract = await RecipientsManager.new();
    })



    it('should assign a COO', async () => {
        await contract.setCOO(coo, { from: ceo });

        const actualCOO = await contract.getCOO()

        expect(actualCOO).to.equal(coo);

        expect(await contract.isCOO({ from: ceo })).to.equal(false);
        expect(await contract.isCOO({ from: coo })).to.equal(true);
        expect(await contract.isCOO({ from: cfo })).to.equal(false);

    })

    it('should assign a CFO', async () => {

        await contract.setCFO(cfo, { from: ceo });

        const actualCFO = await contract.getCFO()

        expect(actualCFO).to.equal(cfo);

        expect(await contract.isCFO({ from: ceo })).to.equal(false);
        expect(await contract.isCFO({ from: coo })).to.equal(false);
        expect(await contract.isCFO({ from: cfo })).to.equal(true);

    })

    it('can\'t assign CFO to zero address', async () => {
        const result = contract.setCFO("0x0000000000000000000000000000000000000000", { from: ceo });
        await truffleAssert.reverts(result);
    })

    it('can\'t set CFO with COO', async () => {
        const result = contract.setCFO("0x0000000000000000000000000000000000000002", { from: coo });
        await truffleAssert.reverts(result);
    })

    it('CEO only functions can only called by CEO', () => {

    })

    it('COO only functions can only called by COO', () => {

    })

    it('CFO only functions can only called by CFO', () => {

    })

    it('Only C-suite functions can be called by COO, CEO, or CFO (but no one else)', () => {

    })

})
