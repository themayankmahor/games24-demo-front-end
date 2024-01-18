import Base from "../components/Base"
import { BASE_URL } from "../services/helper";
import LicensedPlatform from "../components/about/LicensedPlatform";
import Other from "../components/about/Other";
import ProjectsBanner from "../components/about/ProjectsBanner";
import PauseOnHover from "../components/about/ProjectSmallCards";
import ClientsAndPartner from "../components/about/ClientsAndPartners";
import ClientTestimony from "../components/about/ClientTestimony";


const About = () =>{
 
    return(
        <Base>
            {/* Banner Image */}
            <img className='' src={BASE_URL+'/games/image/banner.jpg'} style={{maxWidth:'100%'}} alt="Logo" />
            
            {/* ENGINEERING CRITICAL HITS ---START--- */}
            <div className="black-background">
                <h1 className="mb-5" style={{fontWeight:'bold', fontSize:'50px'}}>ENGINEERING CRITICAL HITS</h1>
                
                {/* outter div */}
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>

                    {/* Left side content */}
                <div style={{ width: '45%' }}>
                    <h5>
                        Founded in 2012, 24 Bit Games is a Unity focused technical game development studio based in Johannesburg, South Africa.
                    </h5>
                </div>

                {/* Right Side content */}
                <div style={{ width: '45%' }}>
                <h5> 
                    Led by game industry veterans, our diverse 40+ person team of world class engineers, technical artists, producers, and QA testers is the largest and most experienced game development services studio on the African continent.
                </h5>
                </div>
                </div>
                
            </div>

            {/* ENGINEERING CRITICAL HITS ---END---*/}

            {/* Licensed Platform ---START--- */}
            <LicensedPlatform/>

            {/* Other Component*/}
            <Other/>

            {/* ProjectBanner Componet */}
            <ProjectsBanner />

            {/* Small Game Cards */}
            <PauseOnHover/>

            {/* Clients And Partners */}
            <ClientsAndPartner/>

            {/* Client Testimony */}
            <ClientTestimony/>

        </Base>
    )

}

export default About;