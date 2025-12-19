import { useEffect, useState } from 'react';
import type { NonSensitiveDiaryEntry } from '../../types/diaries';

const List = () => {
    const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);

    useEffect(() => {
        const fetchDiaries = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/diaries');
                const data = await response.json();
                setDiaries(data);
            } catch (error) {
                console.error("Error fetching diaries:", error);
            }
        };

        fetchDiaries();
    }, []);

    return (
        <div>
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