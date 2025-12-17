import type { CoursePart } from "../types";

interface contentProps {
    courseParts: CoursePart[];
}

const Content = (props: contentProps) => {
  return (
    <div>   
        {props.courseParts.map((part, index) => (
            <p key={index}>
                {part.name} : {part.exerciseCount}
            </p>
        ))}
    </div>
    );
};

export default Content;