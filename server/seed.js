import Database from "better-sqlite3";

const db= new Database('database.db')

db.exec(`CREATE TABLE IF NOT EXISTS feedbacks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    gust TEXT,
    feedback TEXT
    )`)

    db.exec(`INSERT into feedbacks (gust,feedback)

    VALUES
    ('Abel', 'I loved the service, hopefully i will come back'),
    ('Jhon', 'large and clean bed rooms'),
    ('Tom', 'Nice breakfast')
    `)