// API
const axios = require('axios')

class Api {
    static getWeatherbyCoords(req,res,next){
        let {lat,lon} = req.query
        const url = 'https://api.openweathermap.org/data/2.5/weather'
        axios.get(url,{
            params:{
                lat,
                lon,
                appid:'bea7899e82e2e085b14050d260ac7a49'
            }
        })
        .then(response=>{
            res.status(200).json(response.data)
        })
        .catch(next)
    }
    static async playMusic(req,res,next){
        try {
            let {keyword} = req.query
            keyword.replace(' ','+')
            const url = `https://api.mixcloud.com/search/?q=${keyword}&amp;type=cloudcast`
            let response = await axios.get(url)
            
            let data = response.data.data
            for (let i = 0; i < data.length; i++) {
                const element = data[i];
                let embed = await axios.get(`https://www.mixcloud.com/oembed/`,{
                    params:{
                        url:element.url,
                        format:'json'
                    }
                })
                element.html = embed.data.embed
            }
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }

    }
}

module.exports = Api