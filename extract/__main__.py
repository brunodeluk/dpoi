from jsonld import JsonLdExtractor
from microdata import MicrodataExtractor
import requests
import json
import sys

def main():
    jsonld = scrap(sys.argv[1])
    print(jsonld)


def scrap(url):

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



if __name__ == "__main__":
    main()
