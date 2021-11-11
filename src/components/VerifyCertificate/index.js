import React, {useState} from "react";
import "./index.css";
import VerifyCertificateImg from "../../assets/img/verify-certificate.png"
import SampleCertificateImg from "../../assets/img/sample_ceritificate.png"
import ValidCertificateImg from "../../assets/img/ValidCertificate.png"
import InvalidCertificateImg from "../../assets/img/InvalidCertificate.jpeg"
import QRCodeImg from "../../assets/img/qr-code.svg"
import {CertificateStatus} from "../CertificateStatus";
import {CustomButton} from "../CustomButton";
import QRScanner from "../QRScanner";
import JSZip from "jszip";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
export const CERTIFICATE_FILE = "certificate.json";

export const VerifyCertificate = () => {
    const [result, setResult] = useState("");
    const [showScanner, setShowScanner] = useState(false);
    const handleScan = data => {
        if (data) {
            const zip = new JSZip();
            zip.loadAsync(data).then((contents) => {
                return contents.files[CERTIFICATE_FILE].async('text')
            }).then(function (contents) {
                setResult(contents)
            }).catch(err => {
                    setResult(data)
                }
            );

        }
    };
    const handleError = err => {
        console.error(err)
    };
    return (
        <div className="container-fluid verify-certificate-wrapper">
            {
                !result &&
                <>
                    {!showScanner &&
                    <>
                        <img src={VerifyCertificateImg} className="banner-img" alt="banner-img"/>
                        <h3 className="text-center">Verify a vaccination certificate</h3>
                        <CustomButton className="green-btn" onClick={() => setShowScanner(true)}>
                            <span>Scan QR code</span>
                            <img className="ml-3" src={QRCodeImg} alt={""}/>
                        </CustomButton>
                        <Container className="mt-5 p-4 mb-5">
                            <p>
                                The Co-WIN vaccination certificate has a digitally signed secure QR code.

                                This can be authenticated online  using the verification utility in this portal or using third party verification app using the services outlined below.
                            </p>
                            <h6 style={{color:"#646D82"}}>Option 1 – Online verification</h6>
                            <p style={{color:"#646D82"}}>Steps for online verification:</p>
                            <ol className="verify-steps">
                                <li>Visit <a href="https://verify.cowin.gov.in/">https://verify.cowin.gov.in/</a></li>
                                <li>Click on <b>“Scan QR”</b> code</li>
                                <li>A notification will prompt to activate your device’s camera</li>
                                <li>Point the camera to the QR code on the bottom right of the certificate issued and scan</li>
                                <li>Please keep the following points in mind while scanning the QR code</li>
                                <ul className="success-verify">
                                    <li>QR code should cover at-least 70%-80% of screen</li>
                                    <li>Complete QR code should be part of camera frame</li>
                                    <li>QR code should be parallel to the camera</li>
                                    <li>Camera should be hold steadily for at-least 5 sec</li>
                                </ul>
                                <li>If camera is unable to read the QR code within 45 seconds, a message - <b>“Camera is not able to read the QR code, please try again”</b> with a try again button will be displayed. Verifier will be required to scan the QR code again following the instructions mentioned in Step 2.</li>
                                <li>On successful verification, following attributes are displayed on the screen:
                                </li>
                                <Row>
                                    <Col>
                                        <ul className="success-verify">
                                            <li>Message <b>“Certificate Successfully Verified”</b></li>
                                            <li>Name</li>
                                            <li>Age</li>
                                            <li>Gender</li>
                                            <li>Certificate ID</li>
                                            <li>Beneficiary ID</li>
                                            <li>Vaccine Name</li>
                                            <li>Date of Dose</li>
                                            <li>Vaccination Status</li>
                                            <li>Vaccination at</li>
                                        </ul>
                                    </Col>
                                    <Col>
                                        <img src={ValidCertificateImg} alt=""/>
                                    </Col>
                                </Row>
                                <li>In case of an unsuccessful verification if the certificate is not genuine, screen will show the message “Certificate Invalid”</li>
                                <img src={InvalidCertificateImg} alt=""/>
                            </ol>
                        </Container>
                    </>}
                    {showScanner &&
                    <>
                        <QRScanner onError={handleError}
                                   onScan={handleScan}/>
                        <CustomButton className="green-btn" onClick={() => setShowScanner(false)}>BACK</CustomButton>
                    </>
                    }
                </>
            }
            {
                result && <CertificateStatus certificateData={result} goBack={() => {
                    setShowScanner(false);
                    setResult("");
                }
                }/>
            }


        </div>
    )
};
