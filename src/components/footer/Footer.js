
import {BsFacebook} from "react-icons/bs";
import {BsTwitter} from "react-icons/bs";
import {BsLinkedin} from "react-icons/bs";
import {BsInstagram} from "react-icons/bs";
import "./footer.css";
export default function Footer() {

    return (
        <div className="footer">
            <div className="sb-footer section-padding">
                <div className="sb-footer-links">
                    <div className="sb-footer-links-div">
                        <h4>Join us</h4>
                        <a href="contact">
                            <p>Teach Quraan</p>
                        </a>
                        <a href="contact">
                            <p>About us</p>
                        </a>
                        <a href="contact">
                            <p>Contact us</p>
                        </a>
                    </div>
                    <div className="sb-footer-links-div">
                        <h4>Resources</h4>
                        <a href="resource">
                            <p>Careers</p>
                        </a>
                        <a href="blog">
                            <p>Blog</p>
                        </a>
                        <a href="help">
                            <p>Help and Support</p>
                        </a>
                    </div>
                    <div className="sb-footer-links-div">
                        <h4>Terms and Policy</h4>
                        <a href="terms">
                            <p>Terms</p>
                        </a>
                        <a href="policy">
                            <p>Privacy policy</p>
                        </a>
                        <a href="accessibility">
                            <p>Accessibility statement</p>
                        </a>
                    </div>
                    <div className="sb-footer-links-div">
                        <h4>Application</h4>
                        <a href="terms">
                            <p>Get the app</p>
                        </a>
                        <a href="site">
                            <p>Sitemap</p>
                        </a>
                        <a href="affiliate">
                            <p>Affiliate</p>
                        </a>
                    </div>
                    <div className="sb-footer-links-div">
                        <h4>Coming soon</h4>
                        <div href="social-media">
                            <p><BsFacebook/></p>
                            <p><BsTwitter/></p>
                            <p><BsLinkedin/></p>
                            <p><BsInstagram/></p>
                        </div>
                    </div>
                </div>
                <hr></hr>
                <div className="sb-footer-below">
                    <div className="sb-footer-copyright">
                        <p>
                            @{new Date().getFullYear()} All right reserved.
                        </p>
                    </div>
                    <div className="sb-footer-below-links">
                        <a href="cookie">
                            <div><p>Cookie Declaration</p></div>
                        </a>
                        <a href="terms">
                            <div><p>Security</p></div>
                        </a>
                    </div>

                </div>
            </div>
        </div>
    )
}