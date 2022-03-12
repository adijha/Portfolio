const projectsData = [
  {
    title: 'A URL Shortner',
    description: `I built this project to learn golang and postgres. It's a URL shortner that allows you to shorten your long URLs.
    It uses a postgres database to store the user data and a redis cache to store the shortened URLs.
    The frontend is built with html and vanilla javascript and the backend is built with Go.`,
    imgSrc: '/static/images/time-machine.jpg',
    href: 'https://nolink.ml',
  },
  {
    title: 'Refresher | a vs code extension',
    description: `It's a simple extension that allows you to refresh the browser tab when you save any file in project directory
    I used typescript here, and for refreshing browser I used chrome cli. We can install chrome cli by using brew install chrome-cli.
    And for file change tracking I am using VS code's native api.`,
    imgSrc: '/static/images/time-machine.jpg',
    href: 'https://marketplace.visualstudio.com/items?itemName=adijha07.refresher',
  },
]

export default projectsData
