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
    title: 'The Time Machine',
    description: `Imagine being able to travel back in time or to the future. Simple turn the knob
    to the desired date and press "Go". No more worrying about lost keys or
    forgotten headphones with this simple yet affordable solution.`,
    imgSrc: '/static/images/time-machine.jpg',
    href: '/blog/the-time-machine',
  },
]

export default projectsData
