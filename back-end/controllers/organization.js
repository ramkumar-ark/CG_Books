import Organization from "../models/organization";
import { mapOrgToUser } from "./user";

const processDetails = (orgDetails) => {
    const {name, country, state, street1, street2, city, pinCode, gstin, isGst, userId} = orgDetails;
    const details = {name};
    const address = {addressLine1: street1, addressLine2: street2, city, pinCode, state, country, addedBy: userId};
    details.address = {principlePlace:[address]};
    console.log(details.address.principlePlace);
    details.users = [userId];
    details.isGstApplicable = !!isGst;
    if (details.isGstApplicable) {
        details.gstin = gstin;
        details.pan = gstin.slice(2, 12);
        switch (details.pan[3]) {
            case "P":
                details.assesseeType = "Individual";
                break;

            case "C":
                details.assesseeType = "Company";
                break;

            case "F":
                details.assesseeType = "Firm";
                break;
            
            case "H":
                details.assesseeType = "HUF";
                break;

            case "A":
                details.assesseeType = "AOP";
                break;
            
            case "B":
                details.assesseeType = "BOI";
                break;

            case "T":
                details.assesseeType = "Trust";
                break;
            default:
                details.assesseeType = "Unknown";
                break;
        }
    }
    return details;
};

export const addOrganization = async (orgDetails) => {
    try{
        const details = processDetails(orgDetails);
        console.log(details);
        const org = await Organization.create(details);
        await mapOrgToUser(org.id, orgDetails.userId);
        return Promise.resolve({orgId: org.id});
    }catch(error){
        return Promise.reject({error});
    }
};

export const getOrgById = async (orgId) => {
    try {
        const org = await Organization.findById(orgId).exec();
        if (org) return Promise.resolve(org);
        return Promise.reject({message: "Data Not Found!"})
    } catch (error) {
        return Promise.reject(error.data);
    }
};
