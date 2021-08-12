const AdminsManager = artifacts.require('./AdminsManager.sol')

contract('AdminsManager', (accounts) => {

  let adminsManager;

  let [ ceo, coo, admin1_group1, recipient1_group1 ] = accounts;

  beforeEach( async () => {

    adminsManager = await AdminsManager.new();

    await adminsManager.setCOO(coo);

  })
  
  xit('should create', async () => {
    // const adminsManagerInstance = 
    // expect(adminsManager).to.equal(true);


    // Set value of 89
    // await adminsManagerInstance.set(89, { from: accounts[0] })

    // Get stored value
    // const storedData = await adminsManagerInstance.get.call()

    // assert.equal(storedData, 89, 'The value 89 was not stored.')

    // const foo = await adminsManagerInstance.foo.call();

    // expect(foo).to.equal('heyyy')
  })


  it('adds an admin', async () => {

    // TODO

    // ** setup
    // assign a user as COO
    //  

    // ** act
    // call addAdmin with COO

    const mockGroupId = 123;

    await adminsManager.addAdmin(admin1_group1, mockGroupId, { from: coo });

    // ** assert
    // expect that the user was added to mapping
    // expect that users' "admin index" is what it should be.

    const expectedAdminIndex = 1;

    const actualAdminIndexBn = await adminsManager.getMyAdminIndex(mockGroupId, { from: admin1_group1 });
    // const actualAdminIndexBn = await adminsManager.getMyAdminIndex(mockGroupId, { from: admin1_group1 });
    
    console.log(actualAdminIndexBn.toNumber());

    // [mockGroupId][admin1_group1];

    expect(actualAdminIndexBn.toNumber()).to.equal(expectedAdminIndex);

  })

})
