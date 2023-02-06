import React from 'react';
import './Footer.css';
import TarjetaFooter from 'Components/Base/TarjetaFooter.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faLocationDot , faPhone, faGlobe } from '@fortawesome/free-solid-svg-icons';

function Footer() {

    return (
        <React.Fragment>
            <footer className="footer-05 bg-success bg-gradient">
                <div className="container border-bottom pb-3 mb-3">
                    <div className="row">
                        <div className="col-md-6 col-lg-3 mb-md-0 mb-4">
                            <h2 className="footer-heading">Mis Recetas</h2>
                            <div className="block-23 mb-3">
                                <ul className='p-0'>
                                    <li className='mb-3 intereses'><FontAwesomeIcon icon={faLocationDot} className='intereses'/> Av.Reina Sofia,21,03610 Petrer,Alicante.</li>
                                    <li className='mb-3 intereses'><FontAwesomeIcon icon={faPhone} className='intereses'/> +34 6654 147 785</li>
                                    <li className='mb-3 intereses'><FontAwesomeIcon icon={faGlobe} className='intereses'/> misrecetas.com</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3 mb-md-0 mb-4">
                        <h2 className="footer-heading">Redes Sociales</h2>
                            <div className="block-23 mb-3">
                                <ul className=' d-flex flex-column gap-4'>
                                    <li><FontAwesomeIcon color='#00acee' icon={faTwitter} className="icono"/><span className='nombreIcono'>&nbsp;Twitter</span></li>
                                    <li><FontAwesomeIcon color='#3b5998' icon={faFacebook} className="icono"/><span className='nombreIcono'>&nbsp;Facebook</span></li>
                                    <li><FontAwesomeIcon color='#bc1888' icon={faInstagram} className="icono"/><span className='nombreIcono'>&nbsp;Instagram</span></li>
                                </ul>
                            </div>  
                        </div>
                        <div className="col-md-6 col-lg-6 mb-md-0 mb-4">
                            <h2 className="footer-heading">Ubicación</h2>
                                <iframe src={'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d399830.9110043341!2d-1.0722658276848884!3d38.47197164175836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6237b3341fa76b%3A0xcc524af74e65280c!2sCl%C3%ADnica%20UME!5e0!3m2!1ses!2ses!4v1672142030327!5m2!1ses!2ses'} loading="lazy" className='mapa'></iframe>       
                        </div>
                    </div>
                </div>
                <p className="text-center">© 2023 Company, Inc</p>
            </footer>
        </React.Fragment>
    );
}
export default Footer;