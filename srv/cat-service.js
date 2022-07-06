const cds = require('@sap/cds')
module.exports = async function () {
    const db = await cds.connect.to('db')
    const {
        Roles,
        Users_Role_Assign,
        Vendor_List,
        User_Approve_Maintain,
        Pricing_Conditions
    } = db.entities("ferrero.mro");
    this.on("READ", "CheckUserRole", async (req, next) => {
        var result;
        var logOnUser = req.user.id;
        if (logOnUser && logOnUser !== "") {
            try {
                result = await SELECT.from(Users_Role_Assign).where({ user: req.user.id });
            } catch (err) {
                return err;
            }
            return result;
        } else {
            req.error(500, "logon user unavailable");
        }
    });
    this.before("INSERT", "PricingConditions", async (req, next) => {
        var logOnUser = req.user.id;
        req.data.initiator = req.user.id;
        req.data.uuid = cds.utils.uuid();
        return req;
    });


    this.before("INSERT", "VendorList", async (req, next) => {
        var logOnUser = req.user.id;
        req.data.initiator = req.user.id;
        req.data.uuid = cds.utils.uuid();
        return req;
    });

}