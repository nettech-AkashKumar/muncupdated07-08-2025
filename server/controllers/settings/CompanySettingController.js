const companysettingModal = require("../../models/settings/companysettingmodal");

const sendCompanyProfile = async (req, res) => {
  try {
    const {
      companyName,
      companyemail,
      companyphone,
      companyfax,
      companywebsite,
      companyaddress,
      companycountry,
      companystate,
      companycity,
      companypostalcode,
    } = req.body;

    const existingProfile = await companysettingModal.findOne();
    

    const updatedData = {
      companyName,
      companyemail,
      companyphone,
      companyfax,
      companywebsite,
      companyaddress,
      companycountry,
      companystate,
      companycity,
      companypostalcode,
      companyIcon: req.files?.companyIcon?.[0]?.path || existingProfile?.companyIcon || "",
      companyFavicon: req.files?.companyFavicon?.[0]?.path || existingProfile?.companyFavicon || "",
      companyLogo: req.files?.companyLogo?.[0]?.path || existingProfile?.companyLogo || "",
      companyDarkLogo: req.files?.companyDarkLogo?.[0]?.path || existingProfile?.companyDarkLogo || "",
    };
    let savedCompanyProfile;
    if (existingProfile) {
      savedCompanyProfile = await companysettingModal.findByIdAndUpdate(
        existingProfile._id,
        updatedData,
        {new:true}
      )
    } else {
      // create
      const companyprofile = new companysettingModal(updatedData)
      savedCompanyProfile = await companyprofile.save();
    }
    res.status(201).json({
      success: true,
      message: existingProfile ? "Company Profile updated" : "Company Profile created",
      data: savedCompanyProfile,
    });
  } catch (error) {
    console.error("Error in sending company profile", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send company profile",
      error:
        typeof error === "object" ? JSON.stringify(error) : error.toString(),
    });
  }
};
// get logic
const getCompanyProfile = async (req, res) => {
  try {
    const companyProfile = await companysettingModal
      .findOne()
      .sort({ createdAt: -1 });
    if (!companyProfile) {
      return res
        .status(404)
        .json({ success: false, message: "Company profile not found" });
    }
    res.status(200).json({ success: true, data: companyProfile });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching profile" });
    console.error("Error", error);
  }
};

module.exports = { sendCompanyProfile, getCompanyProfile };
