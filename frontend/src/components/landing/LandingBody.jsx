import React from 'react'; 
import styles from "./LandingBody.module.css";
import Carousel from 'react-bootstrap/Carousel';
import { carouselContent } from '../../../data/landingCarousel';

const LandingBody = () => {
    return (
        <div className={styles.carouselContainer}>
            <Carousel>
                {carouselContent.map((content, index) => (
                    <Carousel.Item interval={3000} key={index}>
                        <img
                            className="d-block w-100"
                            src={content.image}
                            alt={content.title}
                            height="600px"
                            width="1000px"
                            style={{opacity: "90%"}}
                        />
                        <Carousel.Caption>
                            <div style={{color: "white", padding: "1rem", backgroundColor: "black", width: "100%", opacity: "60%", borderRadius: "5px"}}>
                                <h3>{content.title}</h3>
                                <p>{content.description}</p>
                            </div>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
}

export default LandingBody;
