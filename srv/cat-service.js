const cds = require('@sap/cds');
const createNoti = require('./createNotification');
module.exports = async function () {
    const db = await cds.connect.to('db')
    const {
        Roles,
        Users_Role_Assign,
        Vendor_List,
        User_Approve_Maintain,
        Pricing_Conditions,
        pricingNotifications,
        vendorNotifications
    } = db.entities("ferrero.mro");
    this.on("READ", "CheckUserRole", async (req, next) => {
        var result;
        var logOnUser = req.user.id;
        if (logOnUser && logOnUser !== "") {
            try {
                result = await SELECT.from(Users_Role_Assign).where({ userid: req.user.id });

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
        // if (logOnUser && logOnUser !== "") {
        try {
            var result = await SELECT.from(User_Approve_Maintain).where({ userid: req.user.id });
            if (result.length > 0) {
                req.data.approver = result[0].managerid;
                req.data.initiator = req.user.id;
                req.data.status = "Pending";
                req.data.initiator = req.user.id;
                req.data.uuid = cds.utils.uuid();
                return req;
            } else {
                req.error("Please assign manager to the user " + req.user.id);
            }
        } catch (err) {
            req.error("500", error);
        }
        // }
    });

    this.after("INSERT", "PricingConditions", async (req, next) => {
        // var finalInfo = await next();
        result = await SELECT.from(Users_Role_Assign).where({ userid: req.approver });
        var mailId;
        if (result.length > 0) {
            mailId = result[0].mail_id;
        }
        await INSERT.into(pricingNotifications).entries({
            "uuid": cds.utils.uuid(),
            "ref_id": req.uuid,
            "Pricing_Conditions_manufacturerCode": req.manufacturerCode,
            "Pricing_Conditions_countryCode": req.countryCode,
            "status": "Pending"
        });
        createNoti.mainPayload({
            manufacturerCode: req.manufacturerCode,
            countryCode: req.countryCode,
            from_mail: mailId !== "" ? mailId : "bvsr91@gmail.com",
            recipients: ["b.b.srinivasa.reddy@accenture.com", "divya.emuri@accenture.com"]
        });
        return req;
    });


    this.before("INSERT", "VendorList", async (req, next) => {
        var logOnUser = req.user.id;
        try {
            result = await SELECT.from(User_Approve_Maintain).where({ userid: req.user.id });
            if (result.length > 0) {
                req.data.approver = result[0].managerid;
                req.data.initiator = req.user.id;
                req.data.status = "Pending";
                req.data.uuid = cds.utils.uuid();
                return req;
            } else {
                req.error("Please assign manager to the user " + req.user.id);
            }
        } catch (err) {
            req.error("500", error);
        }
    });

    this.after("INSERT", "VendorList", async (req, next) => {
        try {
            await INSERT.into(vendorNotifications).entries({
                "uuid": cds.utils.uuid(),
                "ref_id": req.uuid,
                "Vendor_List_manufacturerCode": req.manufacturerCode,
                "Vendor_List_localManufacturerCode": req.localManufacturerCode,
                "Vendor_List_countryCode": req.countryCode,
                "status": "Pending"
            });
            // result = await SELECT.from(User_Approve_Maintain).where({ userid: req.user.id });
            // if (result.length > 0 && result[0].managerid !== "") {
            //     req.data.approver = result[0].managerid;
            //     req.data.initiator = req.user.id;
            //     req.data.Status = "Pending";
            // } else {
            //     req.error(500, "Approver not maintained for the user: " + req.user.id);
            // }
            // createNoti.mainPayload({
            //     product: "Srinivas",
            //     category: "Reddy",
            //     stock: "100",
            //     recipients: ["b.b.srinivasa.reddy@accenture.com", "divya.emuri@accenture.com"]
            // });
        } catch (err) {

        }
        // req.data.uuid = cds.utils.uuid();
        return req;
    });

    // this.before("INSERT", "PricingNotifications", async (req, next) => {
    //     var logOnUser = req.user.id;
    //     req.data.initiator = req.user.id;
    //     // try {
    //     //     // result = await SELECT.from(User_Approve_Maintain).where({ userid: req.user.id });
    //     //     // if (result.length > 0 && result[0].managerid !== "") {
    //     //     //     req.data.approver = result[0].managerid;
    //     //     //     req.data.initiator = req.user.id;
    //     //     //     req.data.Status = "Pending";
    //     //     // } else {
    //     //     //     req.error(500, "Approver not maintained for the user: " + req.user.id);
    //     //     // }
    //     //     // createNoti.mainPayload({
    //     //     //     product: "Srinivas",
    //     //     //     category: "Reddy",
    //     //     //     stock: "100",
    //     //     //     recipients: ["b.b.srinivasa.reddy@accenture.com", "divya.emuri@accenture.com"]
    //     //     // });
    //     // } catch (err) {

    //     // }
    //     req.data.id = cds.utils.uuid();
    //     return req;
    // });

    this.before("INSERT", "pricingNotifications", async (req, next) => {
        return req;
    });
}