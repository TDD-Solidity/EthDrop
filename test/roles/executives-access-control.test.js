const ExecutivesAccessControl = artifacts.require('./ExecutivesAccessControl.sol')
const truffleAssert = require('truffle-assertions');

contract('ExecutivesAccessControl', (accounts) => {

    let contract;

    let [ceo, coo, cfo, admin1_group1, recipient1_group1] = accounts;

    beforeEach(async () => {

        contract = await ExecutivesAccessControl.new();

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
                
        const result = contract.setCFO("0x0000000000000000000000000000000000000001", { from: coo });
        await truffleAssert.reverts(result);

    })

})
