const AdminsManager = artifacts.require('./AdminsManager.sol')

contract('AdminsManager', (accounts) => {

  let adminsManager;

  let [ceo, coo, nonAdmin, admin1, admin2, recipient1_group1] = accounts;

  const mockGroupId = 124;

  const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

  const mockRequestedUserName = "bob";

  beforeEach(async () => {

    adminsManager = await AdminsManager.new();

    await adminsManager.setCOO(coo);

  })

  it('adds two admins to a group', async () => {

    await adminsManager.addAdmin(mockGroupId, admin1, 'admin1', { from: coo });

    const admin1IndexFirst = (await adminsManager.getMyAdminIndex(mockGroupId, { from: admin1 })).toNumber();
    expect(admin1IndexFirst).to.equal(1);

    await adminsManager.addAdmin(mockGroupId, admin2, 'admin2', { from: coo });

    const admin2Index = (await adminsManager.getMyAdminIndex(mockGroupId, { from: admin2 })).toNumber();
    const admin1IndexSecond = (await adminsManager.getMyAdminIndex(mockGroupId, { from: admin1 })).toNumber();
    const nonAdminIndex = (await adminsManager.getMyAdminIndex(mockGroupId, { from: nonAdmin })).toNumber();

    expect(admin2Index).to.equal(2);
    expect(admin1IndexSecond).to.equal(1);
    expect(nonAdminIndex).to.equal(0);

    const isAdmin_admin1 = (await adminsManager.amIAdmin(mockGroupId, { from: admin1 }));
    const isAdmin_admin2 = (await adminsManager.amIAdmin(mockGroupId, { from: admin2 }));
    const isAdmin_nonAdmin = (await adminsManager.amIAdmin(mockGroupId, { from: nonAdmin }));

    expect(isAdmin_admin1).to.equal(true);
    expect(isAdmin_admin2).to.equal(true);
    expect(isAdmin_nonAdmin).to.equal(false);

    const adminsInfo = await adminsManager.getAdminsForGroup(mockGroupId, { from: recipient1_group1 });

    expect(adminsInfo[0]).to.deep.equal([ZERO_ADDRESS, admin1, admin2]);
    expect(adminsInfo[1]).to.deep.equal([false, true, true]);
    expect(adminsInfo[2]).to.deep.equal(['zero address', 'admin1', 'admin2']);

  })

  it('removes an admin', async () => {

    await adminsManager.addAdmin(mockGroupId, admin1, 'admin1', { from: coo });
    const isAdmin_admin1_before_removal = (await adminsManager.amIAdmin(mockGroupId, { from: admin1 }));
    expect(isAdmin_admin1_before_removal).to.equal(true);

    await adminsManager.removeAdmin(mockGroupId, admin1, { from: coo });

    const isAdmin_admin1_after_removal = (await adminsManager.amIAdmin(mockGroupId, { from: admin1 }));
    expect(isAdmin_admin1_after_removal).to.equal(false);
  })

  it('admin can be removed and re-enabled', () => {

    // TODO

    // - removeAdmin
    // - reEnableAdmin

  })

  it('other users can\'t call coo-only functions', () => {

    // TODO

    // - addAdmin 
    // - reEnableAdmin
    // - removeAdmin
    // - createNewGroup
    // - endEvent
    // - changeContributor

  })

  it('admin only functions revert when called by user who is NOT an admin', () => {

    // TODO

    // - renounceAdmin
    // - readEventInfo
    // - startEvent
    // - closeEventRegistration
    // - endEvent
    // - addEligibleRecipient
    // - removeEligibleRecipient
    // - changeContributor

  })



  describe('requesting to join a group', async () => {

    beforeEach(async () => {

      await adminsManager.addAdmin(mockGroupId, admin1, 'admin1', { from: coo });

      await adminsManager.requestToJoinGroup(mockGroupId, mockRequestedUserName, { from: recipient1_group1 });

    })

    it('a new user can request to join a group', async () => {

      await adminsManager.approveRequestToJoinGroup(mockGroupId, mockRequestedUserName);

      const joinerRequests = await adminsManager.getNewJoinerRequests(mockGroupId, { from: admin1 });

      const expectedJoinerRequests = [
        [ZERO_ADDRESS, recipient1_group1],
        ['', mockRequestedUserName],
        [false, false]
      ];

      expect(joinerRequests).to.deep.equal(expectedJoinerRequests);

    })

    describe('Approving new joiner requests', () => {

      it('admin can approve a new joiner request', async () => {

        await adminsManager.approveRequestToJoinGroup(mockGroupId, mockRequestedUserName, { from: admin1 });

        // verify that it modified "joiner requests" data
        const joinerRequests = await adminsManager.getNewJoinerRequests(mockGroupId, { from: admin1 });

        const expectedJoinerRequests = [
          [ZERO_ADDRESS, recipient1_group1],
          ['', mockRequestedUserName],
          [false, true]
        ];

        expect(joinerRequests).to.deep.equal(expectedJoinerRequests);

        // verify that it modified "elibible recipients" data
        const eligibleRecipients = await adminsManager.getEligibleRecipients(mockGroupId, { from: admin1 });

        const expectedEligibleRecipients = [
          [ZERO_ADDRESS, recipient1_group1],
          ['', mockRequestedUserName],
          [false, true]
        ];

        expect(eligibleRecipients).to.deep.equal(expectedEligibleRecipients);

      })

      it('non-admins cannot approve new joiner requests', () => {
        // TODO
      })

    })

    describe('Eligible recipients can register for an open event', () => {

      beforeEach(async () => {
        await adminsManager.approveRequestToJoinGroup(mockGroupId, mockRequestedUserName, { from: admin1 });
      })

      it('registers an eligible user for the current event', async () => {

        await adminsManager.registerForEvent(mockGroupId, { from: recipient1_group1 });

        const registeredRecipients = await adminsManager.getRegisteredRecipients(mockGroupId, { from: recipient1_group1 });

        const expectedRegisteredRecipients = [
          [ZERO_ADDRESS, recipient1_group1],
          ['', mockRequestedUserName],
          [false, false]
        ];

        expect(registeredRecipients).to.deep.equal(expectedRegisteredRecipients);

      })

    })

    xdescribe('Setting The Sponsor', () => {

      describe('Setting the sponsor Info', () => {

      })
      
      describe('Contributing To The Pot', () => {
        
        describe('Claming winnings', () => {
    
          beforeEach(async () => {
            await adminsManager.registerForEvent(mockGroupId, { from: recipient1_group1 });
          })
    
          it('allows each user to claim winnings one time', () => {
    
          })
    
        })

      })

    })

  })

  describe('Eligible recipients can register for an open event', () => {

    beforeEach(() => {

    })

    it('', () => {

    })

  })


})