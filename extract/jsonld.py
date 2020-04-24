from lxml import etree
import uuid
import json

class JsonLdExtractor:

    def __init__(self, url):
        self.url = url

    def extract(self, html_string):
        jsonLd = []
        if len(html_string) > 0:
            self._extract_items(html_string, jsonLd)
        return jsonLd

    def _extract_items(self, html_string, collector):
        return self._extract_items_rec(html_string, collector, 0)

    def _extract_items_rec(self, html_string, collector, begin_index):
        index = html_string.find("application/ld+json", begin_index)
        if index > -1:
            start_index = html_string.find(">", index)
            end_index = html_string.find("</script>", start_index)
            raw_json_ld = html_string[start_index + 1:end_index].strip().replace('\n', '').replace('\t', '').replace('\r', '')
            json_ld_object = json.loads(raw_json_ld)
            json_ld_object = self._add_thing_properties(json_ld_object)
            collector.append(json_ld_object)
            return self._extract_items_rec(html_string, collector, end_index)
        return collector

    def _add_thing_properties(self, jsonld):
        str_json = json.dumps(jsonld)
        _id = None

        index = str_json.find('@type')
        while index > -1:
            _id = str(uuid.uuid4())
            extra = '"@id":"' + _id + '",' + '"url":"' + self.url + '",'
            str_json = str_json[0:index-1] + extra + str_json[index-1:]
            index = str_json.find('@type', index + len(extra) + 5)

        return json.loads(str_json)

    def usless_func(self):
        print("hello world")
