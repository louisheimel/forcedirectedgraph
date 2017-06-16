fetch('https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json')
.then(response => response.json())
.then(data => {
  console.log(data)
})
.catch(err => {
  console.log(err)
})
