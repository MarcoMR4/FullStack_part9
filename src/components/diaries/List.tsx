import type { NonSensitiveDiaryEntry } from '../../types/diaries';

interface ListProps {
    diaries: NonSensitiveDiaryEntry[];
}

const List = ({ diaries }: ListProps) => {
    return (
        <div>
            <h2>Diary entries</h2>
            {diaries.map(diary => (
                <div key={diary.id}>
                    <h3>{diary.date}</h3>
                    <p>visibility: {diary.visibility}</p>
                    <p>weather: {diary.weather}</p>
                </div>
            ))}
        </div>
    );
};  

export default List;