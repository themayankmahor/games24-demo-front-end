import { Container } from "reactstrap";
import { BASE_URL } from "../../services/helper";

const Other = () => {

    return(      
        

        <div>
            {/* 1st Div */}
            <div className="shade1-background">
            <h1 className="mb-5" style={{fontWeight:'bold', fontSize:'50px'}}>PORTING</h1>
            
            
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>

                {/* Left side content */}
            <div style={{ width: '45%' }}>
                <h5>
                Between console, VR, mobile, and desktop platforms, we have helped publishers and developers all over the world, from indie to AAA, successfully reach additional audiences for dozens of titles within budget and without compromise.
                </h5>
            </div>

            {/* Right Side content */}
            <div style={{ width: '45%'}}>
            <img className='' src={BASE_URL+'/games/image/banner.jpg'} style={{maxWidth:'100%'}} alt="Logo" />
            </div>

            </div>
            
            </div>


            {/* 2nd Div */}
            <div className="shade2-background">
            
            
            
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>

                {/* Left side content */}
            <div style={{ width: '45%' }}>
        
            <img className='' src={BASE_URL+'/games/image/banner.jpg'} style={{maxWidth:'100%'}} alt="Logo" />

            </div>

            {/* Right Side content */}
            <div style={{ width: '45%'}}>
                
            <h1 className="mb-5" style={{fontWeight:'bold', fontSize:'50px'}}>CO-DEVELOPMENT</h1>
                <h5>
                Need to scale your production with additional engineering talent? From full game programming to tech and tool development to last-mile shipping, we will plug in so seamlessly to your development pipeline that it will feel no different to having your own team of engineers in the room next door.
                </h5>
            </div>

            </div>
            
            </div>

            {/* 3rd Div */}
            <div className="shade3-background">
            <h1 className="mb-5" style={{fontWeight:'bold', fontSize:'50px'}}>OPTIMIZATION</h1>
            
            
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>

                {/* Left side content */}
            <div style={{ width: '45%' }}>
                <h5>
                Looking for some focused expertise to help squeeze the most out of your game technically? From performance optimisation, to memory considerations, to asset pipeline consultation, unlocking your game's full potential is what we do best.
                </h5>
            </div>

            {/* Right Side content */}
            <div style={{ width: '45%'}}>
            <img className='' src={BASE_URL+'/games/image/banner.jpg'} style={{maxWidth:'100%'}} alt="Logo" />
            </div>

            </div>
            
            </div>
        </div>

    )
}

export default Other;