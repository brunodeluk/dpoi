import requests
import json

# given a url, it outputs a JSON-LD

def to_jsonld(url):
  html = requests.get(url, {}, verify=False).text
  jsonLd = []
  if len(html) > 0:
    scrap(html, jsonLd)
  return jsonLd

# actual scraping

def scrap(html, jsonLd):
    return r_scrap(html, jsonLd, 0)

def r_scrap(html, jsonLd, begin_index):
    index = html.find("application/ld+json", begin_index)
    if index > -1:
        start_index = html.find(">", index)
        end_index = html.find("</script>", start_index)
        jsonLd.append(html[start_index + 1:end_index].strip())
        return r_scrap(html, jsonLd, end_index)

    return jsonLd
