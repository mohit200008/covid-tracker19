import React from "react";
import "./footer.css";

function Footer() {
  return (
    <div className="main-footer">
      <div className="container">
        <div className="row">
          {/* Column1 */}
          <div className="col">
            <h1>MADE BY MOHIT LAMBA</h1>
            <h4>ML-ASASSN</h4>
          
          </div>
          {/* Column2 */}
         
          {/* Column3 */}
         
        </div>
        <hr />
        <div className="row">
          <p className="col-sm">
            &copy;{new Date().getFullYear()}| ML-ASASSN | All rights reserved |
            
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;