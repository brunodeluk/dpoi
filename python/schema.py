import requests
from jsonld import JsonLdExtractor
from microdata import MicrodataExtractor

class JsonLd:

  def fromUrl(self, url):
    headers = {
        'Accept': 'text/html',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
    }

    result = []
    response = requests.get(url, headers=headers, timeout=5)
    response.encode = "UTF-8"
    html = response.text
    result.extend(JsonLdExtractor(url).extract(html))
    result.extend(MicrodataExtractor(url).extract(html))
    return result
  
