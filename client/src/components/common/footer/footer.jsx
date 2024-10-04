import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import '@fortawesome/fontawesome-free/css/all.min.css';
import logo from '../../../imgs/g3.png';

export function MyFooter() {
    return (
        <MDBFooter bgColor='zinc-800' className='text-center text-lg-start text-muted mx-auto text-white'
            style={{ 'max-width': '1300px', 'marginTop': '200px' }}>
            <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom bg-gray-700 text-white'>
                <div className='me-5 d-none d-lg-block'>
                    <span>Get connected with us on social networks:</span>
                </div>

                <div>
                    <a href='' className='me-4 text-reset'>
                        <MDBIcon fab icon="facebook-f" />
                    </a>
                    <a href='' className='me-4 text-reset'>
                        <MDBIcon fab icon="twitter" />
                    </a>
                    <a href='' className='me-4 text-reset'>
                        <MDBIcon fab icon="google" />
                    </a>
                    <a href='' className='me-4 text-reset'>
                        <MDBIcon fab icon="instagram" />
                    </a>
                    <a href='' className='me-4 text-reset'>
                        <MDBIcon fab icon="linkedin" />
                    </a>
                    <a href className='me-4 text-reset' alt='github'>
                        <MDBIcon fab icon="github" />
                    </a>
                </div>
            </section>

            <section className='text-white bg-zinc-800'>
                <MDBContainer className='text-center text-md-start mt-5'>
                    <MDBRow className='mt-3'>
                        <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4 flex items-center'>
                                <img src={logo} className="me-2 p-1 w-8 bg-slate-200 rounded-md" alt='logo'/>
                                GAMMA Store
                            </h6>
                            <p>
                                GAMMA groupe was found in 2022, Our headquarter is placed in midtown-cairo
                                and now we're preparing our new office in Alexandria.
                            </p>
                        </MDBCol>

                        <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Sales</h6>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Bundles
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Monitors
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Combos
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Accessories
                                </a>
                            </p>
                        </MDBCol>

                        <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Pricing
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Settings
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Orders
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Help
                                </a>
                            </p>
                        </MDBCol>

                        <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
                            <p>
                                <MDBIcon icon="home" className="me-2" />
                                Cairo, Midtown, st. 13
                            </p>
                            <p>
                                <MDBIcon icon="envelope" className="me-3" />
                                GAMMA@techstore.com
                            </p>
                            <p>
                                <MDBIcon icon="phone" className="me-3" /> + 02 236 77 128
                            </p>
                            <p>
                                <MDBIcon icon="print" className="me-3" /> + 02 236 77 128
                            </p>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>

            <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                © 2021 Copyright:
                <a className='text-reset fw-bold' href='https://mdbootstrap.com/'>
                    MDBootstrap.com
                </a>
            </div>
        </MDBFooter>
    );
}