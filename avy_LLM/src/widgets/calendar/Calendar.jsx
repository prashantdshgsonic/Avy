import React, { useState } from "react";
import s from "./Calendar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";


function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [note, setNote] = useState("");
  // const notes = useSelector((state) => state.notes);
  // const dispatch = useDispatch();
  // // set current date for task
  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  // };
  // // set value from textarea
  // const handleNoteChange = (e) => {
  //   setNote(e.target.value);
  // };
  // //func add task to state
  // const handleSaveNote = () => {
  //   //dispatch(addNote({ date: selectedDate.toDateString(), note }));
  //   setNote("");
  // };
  // // func delete just one task
  // const handleDeleteNote = (date, index) => {
  //   //dispatch(deleteNote({ date, index }));
  // };
  // // func delete all tasks 
  // const handleDeleteAllNotes = (date) => {
  //   //dispatch(deleteNote({ date, index: -1 }));
  // };
  // // func set active date with some task
  // const tileContent = ({ date }) => {
  //   const hasNote =
  //     notes[date.toDateString()] && notes[date.toDateString()].length > 0;

  //   return hasNote ? (
  //     <div
  //       style={{
  //         width: "7px",
  //         height: "7px",
  //         borderRadius: "50%",
  //         backgroundColor: "red",
  //         display: "flex",
  //         margin: "0 auto",
  //       }}
  //     ></div>
  //   ) : null;
  // };

  return (
    <div className={s.interfaceCalendar}>
      <Calendar
        key={"marko"}
        // tileContent={tileContent}
        // onChange={handleDateChange}
        // value={selectedDate}
        // onClickDay={handleDateChange}
        className={s.userCalendar}
      />

      {/* <div className={s.textarea}>
        <textarea
          placeholder="Add a note..."
          value={note}
          //onChange={handleNoteChange}
        />
        <button className={s.btnAddNote} 
        //onClick={handleSaveNote}
        >
          Add
        </button>
      </div> */}

      {/* {notes[selectedDate.toDateString()] && (
        <div style={{ marginTop: "20px" }} className={s.notesTasks}>
          <h3>Notes for {selectedDate.toDateString()}:</h3>
          <ul className={s.notesUl}>
            {notes[selectedDate.toDateString()].map((task, index) => (
              <li key={index}>
                {task}
                <button
                  onClick={() =>
                    handleDeleteNote(selectedDate.toDateString(), index)
                  }
                >
                  &times;
                </button>
              </li>
            ))}
          </ul>
          <button
            //onClick={() => handleDeleteAllNotes(selectedDate.toDateString())}
            className={s.btnDeleteAll}
          >
            Delete All
          </button>
        </div>
      )} */}
    </div>
  );
}

export default App;
