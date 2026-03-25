const mi_url = new URL('https://www.google.com/search?client=opera-gx&q=node&sourceid=opera&ie=UTF-8&oe=UTF-8')

console.log(mi_url.searchParams.get('q')) 