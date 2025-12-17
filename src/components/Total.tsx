interface totalProps {
    total: number
};

const Total = (props: totalProps) => {
    return (
        <div>
            Number of exercises : {props.total}
        </div>
    );
};

export default Total;