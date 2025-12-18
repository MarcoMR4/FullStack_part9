import type { CoursePart } from "../types";

interface contentProps {
    courseParts: CoursePart[];
}

const Content = (props: contentProps) => {

    const renderContentKindFit = (part: CoursePart) => {
        switch (part.kind) {
            case "basic":
                return ` ${part.description}`;
            case "group":
                return ` project count: ${part.groupProjectCount}`;
            case "background":
                return ` ${part.description} \n  Background material: ${part.backgroundMaterial}`;
            case "special":
                return (
                  <span>
                    {part.description}
                    <br />
                    Requirements:
                    <ul>
                      {part.requirements.map((req, i) => (
                        <li key={i}>{req}</li>
                      ))}
                    </ul>
                  </span>
                );
            default:
                return "";
        }
    };

    return (
        <div>
            {props.courseParts.map((part, index) => (
                <div key={index}>
                    <h3> {part.name} : {part.exerciseCount} </h3>
                    {renderContentKindFit(part)}
                </div>
            ))}
        </div>
    );
};

export default Content;