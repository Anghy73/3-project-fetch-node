const { Router } = require('express')

const router = Router()

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
  fetchData(req, res, 'home')
})

router.get('/blogs/:id', (req, res) => {
  if (req.params.id >= 4) {
    return res.render('404')
  }

  fetchData(req, res, 'blogs')
})

module.exports = router