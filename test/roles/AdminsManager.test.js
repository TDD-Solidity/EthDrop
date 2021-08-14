const AdminsManager = artifacts.require('./AdminsManager.sol')

contract('AdminsManager', (accounts) => {

  let adminsManager;

  let [ ceo, coo, nonAdmin, admin1, admin2, recipient1_group1 ] = accounts;

  beforeEach( async () => {

    adminsManager = await AdminsManager.new();

    await adminsManager.setCOO(coo);

  })

  it('adds two admins to a group', async () => {

    const mockGroupId = 123;

    await adminsManager.addAdmin(admin1, mockGroupId, { from: coo });
    await adminsManager.addAdmin(admin2, mockGroupId, { from: coo });

    const admin1Index = (await adminsManager.getMyAdminIndex(mockGroupId, { from: admin1 })).toNumber();
    const admin2Index = (await adminsManager.getMyAdminIndex(mockGroupId, { from: admin2 })).toNumber();
    const nonAdminIndex = (await adminsManager.getMyAdminIndex(mockGroupId, { from: nonAdmin })).toNumber();

    expect(admin2Index).to.equal(2);
    expect(admin1Index).to.equal(1);
    expect(nonAdminIndex).to.equal(0);

    const isAdmin_admin1 = (await adminsManager.amIAdmin(mockGroupId, { from: admin1 }));
    const isAdmin_admin2 = (await adminsManager.amIAdmin(mockGroupId, { from: admin2 }));
    const isAdmin_nonAdmin = (await adminsManager.amIAdmin(mockGroupId, { from: nonAdmin }));

    expect(isAdmin_admin1).to.equal(true);
    expect(isAdmin_admin2).to.equal(true);
    expect(isAdmin_nonAdmin).to.equal(false);

    // TODO - call something like "getAdminsForGroup(mockGroupId)"

  })

})
