import React from "react";
import GetNote from "./components/GetNote";
import TodoForm from "./components/NoteForm";
// import GetNote from "./GetNote";

function Homepage() {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar at top */}
            {/* <Navbar /> */}

            {/* Container for form and notes */}
            <div className="container mx-auto p-4">
                {/* TodoForm with 1px bottom margin */}
                <div className="mb-[1px]">
                    <TodoForm />
                </div>

                {/* Notes list */}
                <GetNote />
            </div>
        </div>
    );
}

export default Homepage;
