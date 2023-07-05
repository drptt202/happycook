import React, { Fragment } from 'react'
import './../styles/Footer.scss'

const Footer = () => {
    return (
        <Fragment>
            <footer className="footer-distributed">

                <div className="footer-right">
                    <a href="https://www.facebook.com/banh.bis/"><i className="fa fa-facebook"></i></a>
                    <a href="https://twitter.com/"><i className="fa fa-twitter"></i></a>
                    <a href="https://www.linkedin.com/"><i className="fa fa-linkedin"></i></a>
                    <a href="https://github.com/drptt202"><i className="fa fa-github"></i></a>
                </div>

                <div className="footer-left">
                    <p className="footer-links">
                        Hope you have a good time
                    </p>
                    <p>Copyright &copy; 2023</p>
                </div>

            </footer>
        </Fragment>
    )
}

export default Footer