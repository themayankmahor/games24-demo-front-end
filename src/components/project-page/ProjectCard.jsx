import { Card } from "reactstrap"

const ProjectCard = ({title, squareImage}) => {

    return(
        <div>
            <Card>
                <img src={squareImage} alt={title}/>
            </Card>
            <div>
                <h5>{title}</h5>
            </div>
        </div>
    )

}

export default ProjectCard;