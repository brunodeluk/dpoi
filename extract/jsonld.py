from lxml import etree
import uuid
import json

class JsonLdExtractor:

    def extract(self, html_string, base_url):
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
            raw_json_ld = html_string[start_index + 1:end_index].strip().replace('\n', '').replace('\t', '').replace('\r', '').replace(' ', '')
            json_ld_object = json.loads(raw_json_ld)
            collector.append(json_ld_object)
            return self._extract_items_rec(html_string, collector, end_index)
        return collector
