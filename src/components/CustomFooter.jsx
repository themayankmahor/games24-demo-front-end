import { BASE_URL } from "../services/helper";
import { Container } from "reactstrap";
import "./CustomFooter.css";

const CustomFooter = () => {
  return (
    <footer className="bg-dark text-light text-center">
      <Container className="footer-container">
        {/* Left side (Image) */}
        <div className="footer-left">
          <img
            className="my-2"
            src={BASE_URL + '/games/image/gamePattyLogo.png'}
            style={{ maxWidth: '250px' }}
            alt="Logo"
          />
          <p className="mb-0">We make Awesome Games</p>
        </div>

        {/* Right side (Paragraph) */}
        <div className="footer-right">
          <p className="mb-0">© All Rights Reserved.</p>
        </div>
      </Container>
    </footer>
  );
};

export default CustomFooter;