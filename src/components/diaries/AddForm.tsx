import { useState } from "react";
import type { NewDiaryEntry, Weather, Visibility } from "../../types/diaries";

const AddForm = () => {
    const [date, setDate] = useState('');
    const [weather, setWeather] = useState<Weather | ''>('');
    const [visibility, setVisibility] = useState<Visibility | ''>('');
    const [comment, setComment] = useState('');

    const diaryCreation = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        const entry: NewDiaryEntry = {
            date,
            weather: weather as Weather,
            visibility: visibility as Visibility,
            comment
        };

        try {
            await fetch('http://localhost:3000/api/diaries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(entry)
            });
            setDate('');
            setWeather('');
            setVisibility('');
            setComment('');
        } catch (error) {
            console.error('Failed to create diary entry', error);
        }
    };

    return (
        <div>
            <h1>Add new diary</h1>
            <form onSubmit={diaryCreation}>
                <div>
                    <label>Date</label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                    <label>Weather</label>
                    <label>sunny <input type="radio" name="weather" value="sunny" onChange={(e) => setWeather(e.target.value as Weather)} /></label>
                    <label>rainy <input type="radio" name="weather" value="rainy" onChange={(e) => setWeather(e.target.value as Weather)} /></label>
                    <label>cloudy <input type="radio" name="weather" value="cloudy" onChange={(e) => setWeather(e.target.value as Weather)} /></label>
                    <label>windy <input type="radio" name="weather" value="windy" onChange={(e) => setWeather(e.target.value as Weather)} /></label>
                    <label>stormy <input type="radio" name="weather" value="stormy" onChange={(e) => setWeather(e.target.value as Weather)} /></label>
                </div>

                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                    <label>Visibility</label>
                    <label>great <input type="radio" name="visibility" value="great" onChange={(e) => setVisibility(e.target.value as Visibility)} /></label>
                    <label>good <input type="radio" name="visibility" value="good" onChange={(e) => setVisibility(e.target.value as Visibility)} /></label>
                    <label>ok <input type="radio" name="visibility" value="ok" onChange={(e) => setVisibility(e.target.value as Visibility)} /></label>
                    <label>poor <input type="radio" name="visibility" value="poor" onChange={(e) => setVisibility(e.target.value as Visibility)} /></label>
                </div>

                <div>
                    <label>Comment</label>
                    <input type="text" name="comment" value={comment} onChange={(e) => setComment(e.target.value)} />
                </div>

                <button type="submit">add</button>
            </form>
        </div>
    );
};

export default AddForm;