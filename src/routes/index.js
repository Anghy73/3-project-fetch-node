const { Router } = require('express')

const router = Router()

let profiles = [
  {
    "id": 1,
    "name": "López",
    "lastname": "Gonzáles",
    "age": 35,
    "country": "Chile",
    "hobbies": [
      "Books",
      "Techno",
      "Biker"
    ]
  },
  {
    "id": 2,
    "name": "Perez",
    "lastname": "Cabrera",
    "age": 29,
    "country": "España",
    "hobbies": [
      "Travel",
      "Dance",
      "Sing"
    ]
  },
  {
    "id": 3,
    "name": "Andy",
    "lastname": "Ruz",
    "age": 18,
    "country": "Chile",
    "hobbies": [
      "Programming",
      "Street workout",
      "Games"
    ]
  }
]


let count = 0

const fetchData = async (req, res, page) => {
  try {
    const response = await fetch("http://jsonplaceholder.typicode.com/posts")
    const data = await response.json()
    res.render(page, {
      data,
      count,
      params: req.params
    })
  } catch (e) {
    console.log(e)
  }
}

router.get('/', (req, res) => {
  res.render('home', {
    profiles,
    link: 1
  })
})

router.get('/blogs/:id', (req, res) => {
  if (req.params.id >= 4) {
    return res.render('404')
  }

  fetchData(req, res, 'blogs')
})

module.exports = router