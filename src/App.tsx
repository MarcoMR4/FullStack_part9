import { useState, useEffect } from "react";
import Header from "./components/diaries/Header";
import List from "./components/diaries/List";
import AddForm from "./components/diaries/AddForm";
import type { NonSensitiveDiaryEntry, DiaryEntry } from "./types/diaries";

const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);

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

  const onNewDiaryAdded = (newDiary: DiaryEntry) => {
    setDiaries(prev => prev.concat(newDiary));
    setShowAddForm(false);
  };

  return (
    <div>
      <Header />
      <button onClick={() => setShowAddForm(!showAddForm)}>Add new diary</button>
      {showAddForm && <AddForm onNewDiaryAdded={onNewDiaryAdded} />}
      <List diaries={diaries} />
    </div>
  );
};

export default App;