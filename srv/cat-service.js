const cds = require('@sap/cds');
const createNoti = require('./createNotification');
// const { Readable, PassThrough } = require("stream");
const SequenceHelper = require("./library/SequenceHelper");
cds.env.features.fetch_csrf = true

const loki = require('lokijs')
const db = new loki('DB')
const mediaDB = db.addCollection('Media')
const { Readable, PassThrough } = require('stream')


module.exports = async function () {
    const db = await cds.connect.to('db')
    const {
        Roles,
        Users_Role_Assign,
        Vendor_List,
        User_Approve_Maintain,
        Pricing_Conditions,
        pricingNotifications,
        vendorNotifications,
        MediaFile,
        ProductImages
    } = db.entities("ferrero.mro");
    this.on("READ", "CheckUserRole", async (req, next) => {
        var result;
        var logOnUser = req.user.id;
        if (logOnUser && logOnUser !== "") {
            try {
                result = await SELECT.from(Users_Role_Assign).where({ userid: logOnUser });

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
        } catch (err) {

        }
        // req.data.uuid = cds.utils.uuid();
        return req;
    });

    this.before("INSERT", "pricingNotifications", async (req, next) => {
        return req;
    });


    this.on("approvePricing", async (req, next) => {
        try {
            var returnValue = "0";
            var aResult = await UPDATE(Pricing_Conditions).with({
                status: "Approved"
            }).where({
                manufacturerCode: req.data.manufacturerCode,
                countryCode: req.data.countryCode
            });
        } catch (err) {
            return err;
        }
    });

    /**
     * Handler method called before creating data entry
     * for entity Mediafile.
     */
    this.before("INSERT", "MediaFile", async (req) => {
        const db = await cds.connect.to("db");
        return req;
    });

    this.on("READ", MediaFile, async (req, next) => {
        if (!req.data.id) {
            return next();
        }
        //Fetch the url from where the req is triggered
        const url = req._.req.path;
        //If the request url contains keyword "content"
        // then read the media content
        if (url.includes("content")) {
            const id = req.data.id;
            var tx = cds.transaction(req);
            // Fetch the media obj from database
            var mediaObj = await tx.run(
                SELECT.one.from("Media.db.MediaFile", ["content", "mediaType"]).where(
                    "id =",
                    id
                )
            );
            if (mediaObj.length <= 0) {
                req.reject(404, "Media not found for the ID");
                return;
            }
            var decodedMedia = "";
            decodedMedia = new Buffer.from(
                mediaObj.content.toString().split(";base64,").pop(),
                "base64"
            );
            return _formatResult(decodedMedia, mediaObj.mediaType);
        } else return next();
    });

    this.before('CREATE', 'Media', req => {
        const obj = mediaDB.insert({ media: '' })
        req.data.id = obj.$loki
    });


    this.on('loadProductImages', async (req) => {
        // req._.req.loggingContext.getTracer(__filename).info('Inside loadProductImages Handler');
        const fs = require("fs")
        const fileExists = require('fs').existsSync
        let fileName = __dirname + `/images/ferrero.png`
        try {
            let importData = fs.readFileSync(fileName)
            await cds.run(INSERT.into(ProductImages).columns(
                'uuid', 'imageType', 'image'
            ).values(
                cds.utils.uuid(), 'image/png', importData
            ));
        } catch (error) {
            return false
        }
    });

    this.before("INSERT", "ProductImages", async (req, next) => {
        // req._.req.loggingContext.getTracer(__filename).info('Inside loadProductImages Handler');
        // const fs = require("fs")
        // const fileExists = require('fs').existsSync
        // let fileName = __dirname + `/images/ferrero.png`;
        try {
            // let importData = fs.readFileSync(fileName);
            // req.data.image = importData;
            const buf = Buffer.from(req.data.image, 'base64');
            req.data.image = buf;
            // let byteArray = JSON.parse('[' + atob(req.data.image) + ']');
            // let buffer = new Uint8Array(byteArray);
            // const b64toBlob = (req.data.image, type = 'application/octet-stream') => fetch(`data:${type};base64,${base64}`).then(res => res.blob());
            // req.data.image = b64toBlob;
            req.data.uuid = cds.utils.uuid();
            // await cds.run(INSERT.into(ProductImages).columns(
            //     'uuid', 'imageType', 'image'
            // ).values(
            //     cds.utils.uuid(), 'image/png', importData
            // ));
        } catch (error) {
            return false
        }
    });



    function _formatResult(decodedMedia, mediaType) {
        const readable = new Readable();
        const result = new Array();
        readable.push(decodedMedia);
        readable.push(null);
        // result.push({ value: readable })
        // return result
        return {
            value: readable,
            '*@odata.mediaContentType': mediaType
        }
    }

}

