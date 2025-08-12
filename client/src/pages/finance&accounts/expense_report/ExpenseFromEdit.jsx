import React, {useState, useEffect} from "react";
import { MdNavigateNext } from "react-icons/md";

const ExpenseFormEdit = () => {
     const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    const imageUrl = localStorage.getItem("previewImage");
    if (imageUrl) {
      setPreviewUrl(imageUrl);
    }
  }, []);
  return (
    <div>
        <div>
            <span style={{color:"#676767", fontSize:"18px", fontFamily:'"Roboto", sans-serif',fontWeight:"500"}}>Accounting & Finance<MdNavigateNext /></span>
            <span style={{color:"#676767", fontSize:"18px", fontFamily:'"Roboto", sans-serif',fontWeight:"500"}}>Expense Report<MdNavigateNext /></span>
            <span style={{color:"#262626",fontSize:"18px", fontFamily:'"Roboto", sans-serif',fontWeight:"500"}}>Tea</span>
        </div>
              <div className="d-flex gap-3" style={{margin:"20px auto" , width:"1000px",}}>
                <div style={{boxShadow:"rgba(0, 0, 0, 0.35) 0px 5px 15px",borderRadius:"8px"}}>
                 <div style={{borderRadius:"8px",padding:"20px", backgroundColor:"white",  display:"flex", flexDirection:"column", gap:"15px"}}>
                 <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                    <span style={{color:"#262626",fontSize:"18px", fontFamily:'"Roboto", sans-serif',fontWeight:"500"}}>Expense Details</span>
                    <span style={{color:"#262626",fontSize:"18px", fontFamily:'"Roboto", sans-serif',fontWeight:"400"}}>12/08/2025</span>
                 </div>
                  <div className="d-flex flex-column">
                    <span style={{color:"#262626",fontSize:"16px", fontFamily:'"Roboto", sans-serif',fontWeight:"500"}}>Expense Name</span>
                    <span style={{color:"#676767",fontSize:"16px", fontFamily:'"Roboto", sans-serif',fontWeight:"500"}}>Tea</span>
                  </div>
                   <div className="d-flex flex-column gap-2">
                    <span style={{color:"#262626",fontSize:"16px", fontFamily:'"Roboto", sans-serif',fontWeight:"500"}}>Notes</span>
                    <textarea name="" id="" placeholder="For Office guest" style={{ fontFamily:'"Roboto", sans-serif',fontSize:"14px",border:"2px dashed #C2C2C2", padding:"10px 20px", borderRadius:"8px", height:"120px", color:"#676767", backgroundColor:"#FBFBFB"}}></textarea>
                   </div>
                    <div className="d-flex justify-content-between">
                        <div className="d-flex flex-column">
                            <span style={{color:"#262626",fontSize:"16px", fontFamily:'"Roboto", sans-serif',fontWeight:"400"}}>Payment Mode</span>
                            <span style={{color:"#676767",fontSize:"16px", fontFamily:'"Roboto", sans-serif',fontWeight:"400"}}>UPI</span>
                        </div>
                        <div className="d-flex flex-column">
                            <span style={{color:"#262626",fontSize:"16px", fontFamily:'"Roboto", sans-serif',fontWeight:"400"}}>Paid To</span>
                            <span style={{color:"#676767",fontSize:"16px", fontFamily:'"Roboto", sans-serif',fontWeight:"400"}}>Shop</span>
                        </div>
                        <div className="d-flex flex-column">
                            <span style={{color:"#262626",fontSize:"16px", fontFamily:'"Roboto", sans-serif',fontWeight:"400"}}>Amount</span>
                            <span style={{color:"#676767",fontSize:"16px", fontFamily:'"Roboto", sans-serif',fontWeight:"400"}}>Chair</span>
                        </div>
                    </div>
            </div>
             <div style={{borderRadius:"8px",padding:"20px", backgroundColor:"white", margin:"20px auto", width:"800px", display:"flex", flexDirection:"column", gap:"15px"}}>
                  <div style={{color:"#262626",fontSize:"16px", fontFamily:'"Roboto", sans-serif',fontWeight:"500"}}><span>Receipt Image</span></div>

                   <div>
                     <span style={{color:"#262626",fontSize:"16px", fontFamily:'"Roboto", sans-serif',fontWeight:"400"}}>Media</span>
                      <div style={{ fontFamily:'"Roboto", sans-serif',fontSize:"14px",border:"2px dashed #C2C2C2", padding:"10px 20px", borderRadius:"8px", height:"200px", color:"#676767",}}>
                         {previewUrl ? (
          <img src={previewUrl} alt="Uploaded" style={{ maxHeight: "100%", maxWidth: "100%" }} />
        ) : (
          "No image uploaded"
        )}
                      </div>
                   </div>
             </div>
             </div>
              <div className="d-flex gap-3">
                <button style={{border:"none", backgroundColor:"#F1F1F1",boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", width:"80px", height:"30px", borderRadius:"4px" }}>Pending</button>
                <button style={{border:"none" , backgroundColor:"#464545ff", color:"white", borderRadius:"4px", width:"40px", height:"30px", }}>Edit</button>
              </div>
              </div>
    </div>
  );
};

export default ExpenseFormEdit;
