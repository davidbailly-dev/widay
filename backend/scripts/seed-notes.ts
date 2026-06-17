import 'dotenv/config';
import ConnectDB from '../src/config/database'
import Note from '../src/models/note'
import notes from '../data/notes.json'

async function seedNotes(): Promise<void> {
    try {
        await ConnectDB();

        if (process.argv.includes('--drop')) {
            console.log('Delete notes requested...');
            await Note.deleteMany({});
            console.log('... Notes deleted !')
        }

        console.log('Seeding notes...');
        await Note.insertMany(notes);
        console.log('... Completed !');
        process.exit(1);
    } catch(error) {
        console.log('Error seedNotes: ', error);
        process.exit(1);
    }
}

seedNotes();

