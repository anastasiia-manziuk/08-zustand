'use client';


import NoteForm from "@/components/NoteForm/NoteForm";
import css from './CreateNote.module.css';
import { useRouter } from 'next/navigation';


export default function CreateNote(){

      const router = useRouter();

  const handleCancel = () => {
    router.back(); 
  };

    return(
        
        <main className={css.main}>
        <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
	     <NoteForm onCancel={handleCancel}/>
        </div>
        </main>

        
    )

}