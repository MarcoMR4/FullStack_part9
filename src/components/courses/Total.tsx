interface totalProps {
    total: number
};

const Total = (props: totalProps) => {
    return (
        <div style={{ marginTop: "5%", fontWeight: 'bold', fontSize: '1.3em' }}>
            Number of exercises : {props.total}
        </div>
    );
};

export default Total;