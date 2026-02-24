import { useState, useEffect } from 'react'
import { motion, scale } from "motion/react"
const Cards = ({ reference }) => {

    const [notes, setNotes] = useState(() => {
        const saved = localStorage.getItem("notes")
        return saved ? JSON.parse(saved) : []
    })

    const [input, setInput] = useState("")

    const highlightColors = [
        'bg-amber-300',
        'bg-emerald-400',
        'bg-sky-400',
        'bg-rose-400',
        'bg-violet-400',
        'bg-lime-300',
        'bg-gray-400'
    ];


    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes))
    }, [notes])

    const addNote = () => {
        if (input.trim() === "") return

        const newNote = {
            id: Date.now(),
            text: input,
            color: highlightColors[Math.floor(Math.random() * highlightColors.length)]
        }

        setNotes([...notes, newNote])
        setInput("")
    }

    const deleteNote = (id) => {
        setNotes(notes.filter(note => note.id !== id))
    }

    return (
        <div className='flex flex-col gap-6 mt-2 mx-2'>

            {/* Input Section */}
            <div className='flex gap-2 p-2 rounded-xl backdrop-blur-md shadow-2xl'>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Write your note..."
                    className='flex-1 px-4 py-3 rounded-lg bg-zinc-800/50 text-zinc-100 placeholder-zinc-500 outline-none ring-1 ring-zinc-700 focus:ring-2 focus:ring-zinc-400 transition-all overflow-scroll'
                />
                <button
                    onClick={addNote}
                    className='px-10 py-3 bg-zinc-500 hover:bg-zinc-400 text-zinc-100 font-medium rounded-lg shadow-lg shadow-blue-900/20 active:scale-95 transition-all hover:cursor-pointer'
                >
                    Add
                </button>
            </div>

            {/* Notes Section */}
            <div className='flex gap-6 flex-wrap p-5'>
                {notes.map(note => (
                    <motion.div drag
                        dragConstraints={reference}
                        whileDrag={{ scale: 1.2 }}
                        key={note.id}
                        className='w-60 h-72 hover:cursor-pointer rounded-[30px] bg-zinc-900/90 text-zinc-300 relative border border-zinc-800 shadow-xl overflow-hidden group flex flex-col'
                    >
                        {/* Note Content Area */}
                        <div className='p-6 h-[calc(100%-56px)] overflow-y-auto custom-scrollbar'>
                            <p className='text-sm leading-relaxed font-medium wrap-break-word'>
                                {note.text}
                            </p>
                        </div>

                        {/* Random Color Bottom Bar */}
                        <div className={`absolute bottom-0 left-0 w-full h-14 ${note.color} flex items-center justify-between px-5`}>
                            <span className='text-zinc-900 text-xs font-bold uppercase tracking-wider'>
                                Note
                            </span>

                            <button
                                onClick={() => deleteNote(note.id)}
                                className='w-8 h-8 flex items-center justify-center rounded-full bg-zinc-900/10 text-zinc-900 hover:bg-zinc-900/20 transition-all cursor-pointer active:scale-90'
                            >
                                <svg xmlns="http://www.w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>



        </div>
    )
}

export default Cards