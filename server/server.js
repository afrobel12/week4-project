import express from "express"
import cors from "cors"


const PORT = process.env.PORT || 3369
import Database from "better-sqlite3"

const db = new Database('database.db')

const app = express()
app.use(express.json())
app.use(cors())



app.get('/feedbacks', (req, res) =>{
    try{

    if (req.query.id) {
      let reactions = db.prepare(`SELECT * FROM feedbacks WHERE id = ?`).all(req.query.id)
      
      res.status(200).json(reactions)

      return
    }

    let feedbacks = db.prepare(`SELECT * FROM feedbacks`).all()

    res.status(200).json(feedbacks)
} catch (err) {
    res.status(500).json(err)
}
})

app.post('/feedbacks', (req, res) =>{
    try{

    const gust = req.body.gust
    const feedback = req.body.feedback

    const newFeedback = db.prepare(`INSERT INTO feedbacks (gust,feedback) VALUES (?,?)`).run(gust,feedback)
    res.status(200).json(newFeedback)
    } catch (err) {
        res.status(500).json({error :err})
    }
    

})


app.delete('/feedbacks/:id', (req, res) =>{
    try {
        const id = req.params.id
        const deletedFeedback = db.prepare(`DELETE FROM feedbacks WHERE id = ?`).run(id)

        res.status(200).json({recordDelete: deletedFeedback})
    } catch (err) {
        res.status(500).json({error: err})
    }
})

app.listen(PORT,() => {
    console.log(`ONLINE: ${PORT}`)
})